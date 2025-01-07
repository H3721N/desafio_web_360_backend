const Usuario = require('./usuario.model');
const Rol = require('../rol/rol.model');
const Estado = require('../estado/estado.model');
const { encrypt } = require('../helpers/handleBcrypt');

const Cliente = require('../clientes/cliente.model');

const postUsuario = async (req, res) => {
    const transaction = await Usuario.sequelize.transaction();
    try {
        const dateUsuario = req.body;

        const existeUsuario = await Usuario.findOne({ where: { email: dateUsuario.email }, transaction });
        if (existeUsuario) {
            await transaction.rollback();
            return res.status(400).json({
                message: 'El correo ya está vinculado a otro usuario',
            });
        }

        const passwordHash = await encrypt(dateUsuario.password);
        const fecha_creacion = new Date();

        const usuarioData = {
            idRol: dateUsuario.idRol,
            idEstado: dateUsuario.idEstado,
            email: dateUsuario.email,
            nombre: dateUsuario.nombre,
            password: passwordHash,
            telefono: dateUsuario.telefono,
            creacionCuenta: fecha_creacion,
            fechaNacimiento: dateUsuario.fechaNacimiento,
        };

        if (dateUsuario.idRol !== 1) {

            const createCliente = await Cliente.create({
                razonSocial: dateUsuario.razonSocial,
                nombreComercial: dateUsuario.nombreComercial,
                direccionEntrega: dateUsuario.direccionEntrega,
                telefono: dateUsuario.telefono,
                email: dateUsuario.email,
            }, { transaction });

            usuarioData.idCliente = createCliente.id;
        }

        const createUsuario = await Usuario.create(usuarioData, { transaction });

        await transaction.commit();

        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Usuario creado de manera exitosa',
            data: createUsuario,
        });
    } catch (error) {
        await transaction.rollback();
        console.error('Error al crear el usuario:', error);
        res.status(500).json({
            message: 'Error al crear el usuario',
            error: error.message,
        });
    }
};

const getUsuarioById = async (req, res) => {
    const id = req.params.id;

    try {
        const usuario = await Usuario.findOne({
            where: { id: id },
        });

        if (!usuario) {
            return res.status(404).json({
                message: 'No se encontró el usuario con el id proporcionado',
            });
        }

        res.status(200).json({
            message: 'Usuario encontrado con éxito',
            data: usuario,
        });
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({
            message: 'Error al obtener el usuario',
            error: error.message,
        });
    }
};

const updateUsuario = async (req, res) => {
    const transaction = await Usuario.sequelize.transaction();
    try {
        const id = req.params.id;
        const dateUsuario = req.body;

        let passwordHash;
        if (dateUsuario.password.startsWith('$2b$')) {
            passwordHash = dateUsuario.password;
        } else {
            passwordHash = await encrypt(dateUsuario.password);
        }

        const usuarioData = {
            idRol: dateUsuario.idRol,
            idEstado: dateUsuario.idEstado,
            nombre: dateUsuario.nombre,
            password: passwordHash,
            telefono: dateUsuario.telefono,
            fechaNacimiento: dateUsuario.fechaNacimiento,
            creacionCuenta: dateUsuario.creacionCuenta,
        };

        if (dateUsuario.idRol !== 1) {
            const usuario = await Usuario.findOne({ where: { id: id }, transaction });
            if (!usuario) {
                await transaction.rollback();
                return res.status(404).json({
                    message: 'No se encontró el usuario con el id proporcionado',
                });
            }

            const cliente = await Cliente.findOne({ where: { id: usuario.idCliente }, transaction });
            if (cliente) {
                await cliente.update({
                    razonSocial: dateUsuario.razonSocial,
                    nombreComercial: dateUsuario.nombreComercial,
                    direccionEntrega: dateUsuario.direccionEntrega,
                    telefono: dateUsuario.telefono,
                    email: dateUsuario.email,
                }, { transaction });
            }

            usuarioData.idCliente = usuario.idCliente;
        } else {
            usuarioData.idCliente = null;
        }

        const updateUsuario = await Usuario.update(usuarioData, {
            where: { id: id },
            transaction
        });

        if (updateUsuario[0] === 0) {
            await transaction.rollback();
            return res.status(404).json({
                message: 'No se encontró el usuario con el id proporcionado',
            });
        }

        await transaction.commit();

        const usuarioActualizado = await Usuario.findOne({
            where: { id: id },
        });

        res.status(200).json({
            message: 'Usuario actualizado con éxito',
            data: usuarioActualizado,
        });
    } catch (error) {
        await transaction.rollback();
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({
            message: 'Error al actualizar el usuario',
            error: error.message,
        });
    }
};

const getUsuario = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.size) || 10;
        const offset = (page - 1) * pageSize;
        const limit = pageSize;

        const { count: total, rows: usuarios } = await Usuario.findAndCountAll({
            offset: offset,
            limit: limit,
            include: [
                {
                    model: Rol,
                    as: 'Rol',
                },
                {
                    model: Cliente,
                    as: 'Cliente',
                },
                {
                    model: Estado,
                    as: 'Estado',
                }
            ]
        });

        const usuariosConCliente = usuarios.map(usuario => ({
            ...usuario.toJSON(),
            rol: usuario.Rol ? usuario.Rol.toJSON() : null,
            cliente: usuario.Cliente ? usuario.Cliente.toJSON() : null
        }));

        res.status(200).json({
            success: true,
            data: usuariosConCliente,
            pagination: {
                totalItems: total,
                totalPages: Math.ceil(total / pageSize),
                currentPage: page,
                pageSize: pageSize
            }
        });
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({
            message: 'Error al obtener los usuarios',
            error: error.message,
        });
    }
};


module.exports = {
    postUsuario,
    updateUsuario,
    getUsuarioById,
    getUsuario
};