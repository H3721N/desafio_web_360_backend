const Usuario = require('./usuario.model');
const { encrypt } = require('../helpers/handleBcrypt');

const postUsuario = async (req, res) => {
    try {
        const dateUsuario = req.body;

        const existeUsuario = await Usuario.findOne({ where: { email: dateUsuario.email } });
        if (existeUsuario) {
            return res.status(400).json({
                message: 'el correo ya esta vinculado a otro usuario',
            });
        }
        const passwordHash = await encrypt(dateUsuario.password);
        const fecha_creacion = new Date();

        console.log('passwordHash = ', passwordHash);

        const createUsuario = await Usuario.create({
            idRol: dateUsuario.idRol,
            idEstado: dateUsuario.idEstado,
            email: dateUsuario.email,
            nombre: dateUsuario.nombre,
            password: passwordHash,
            telefono: dateUsuario.telefono,
            fechaNacimiento: dateUsuario.fechaNacimiento,
            creacionCuenta: fecha_creacion,
            idCliente: dateUsuario.idCliente,
        });

        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Usuario creado de manera exitosa',
            data: createUsuario,
        });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({
            message: 'Error al crear el usuario',
            error: error.message,
        });
    }
}

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
    try {
    const id = req.params.id;
    const dateUsuario = req.body;

    const passwordHash = await encrypt(dateUsuario.password);

    console.log('id = ', id);

    const updateUsuario = await Usuario.update({
        idRol: dateUsuario.idRol,
        idEstado: dateUsuario.idEstado,
        nombre: dateUsuario.nombre,
        password: passwordHash,
        telefono: dateUsuario.telefono,
        fechaNacimiento: dateUsuario.fechaNacimiento,
        creacionCuenta: dateUsuario.creacionCuenta,
        idCliente: dateUsuario.idCliente,
    }, {
        where: { id: id }
    });

    if(updateUsuario === 0){
        return res.status(404).json({
            ok: false,
            status: 404,
            message: 'No se encontró el cliente con el id proporcionado',
        });
    }

    const usuarioActualizado = await Usuario.findOne({
        where: { id: id },
    });

    res.status(200).json({
        message: 'Usuario actualizado con exito',
        data: usuarioActualizado,
    });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({
            message: 'Error al actualizar el usuario',
            error: error.message,
        });
    }
}


module.exports = {
    postUsuario,
    updateUsuario,
    getUsuarioById
};