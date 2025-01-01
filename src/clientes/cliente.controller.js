const Cliente = require('./cliente.model');
const Usuario = require('../usuario/usuario.model');
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

const postCliente = async (req, res) => {
    try {
    const dataCliente = req.body;

    const existeCliente = await Cliente.findOne({ where: { email: dataCliente.email } });
    if (existeCliente) {
        return res.status(400).json({
            message: 'El correo ya esta vinculado a otro cliente',
        });
    }

    const createCliente = await Cliente.create({
        razonSocial: dataCliente.razonSocial,
        nombreComercial: dataCliente.nombreComercial,
        direccionEntrega: dataCliente.direccionEntrega,
        telefono: dataCliente.telefono,
        email: dataCliente.email,
    });
    res.status(200).json({
        message: 'Cliente creado de manera exitosa',
        data: createCliente,
    });
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear el cliente',
            error: error.message,
        });
    }
};

const postClienteUsuario = async (req, res) => {
    const transaction = await Cliente.sequelize.transaction();
    try {
        const dataCliente = req.body;
        //const transaction = await Cliente.sequelize.transaction();

        // validar que el correo no exista
        const existeCliente = await Cliente.findOne({ where: { email: dataCliente.email }, transaction });
        if (existeCliente) {
            await transaction.rollback();
            return res.status(400).json({
                message: 'El correo ya está vinculado a otro cliente',
            });
        }

        // hash de la contraseña
        const hashedPassword = await bcrypt.hash(dataCliente.password, 10);

        // crear cliente
        const createCliente = await Cliente.create({
            razonSocial: dataCliente.razonSocial,
            nombreComercial: dataCliente.nombreComercial,
            direccionEntrega: dataCliente.direccionEntrega,
            telefono: dataCliente.telefono,
            email: dataCliente.email,
        }, { transaction });

        // crear usuario vinculado al cliente
        const createUsuario = await Usuario.create(
            {
                idRol: 1,
                idEstado: 1,
                email: dataCliente.email,
                nombre: dataCliente.nombre,
                password: hashedPassword,
                telefono: dataCliente.telefono,
                fechaNacimiento: dataCliente.fechaNacimiento,
                idCliente: createCliente.id, // vinculación con cliente
            },
            { transaction }
        );

        // confirmar transacción
        await transaction.commit();

        res.status(200).json({
            message: 'Cliente y usuario creados de manera exitosa',
            data: {
                cliente: createCliente,
                usuario: {
                    id: createUsuario.id,
                    email: createUsuario.email,
                    nombre: createUsuario.nombre,
                    telefono: createUsuario.telefono,
                },
            },
        });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({
            message: 'Error al crear el cliente y usuario',
            error: error.message,
        });
    }
};

const updateCliente = async (req, res) => {
    const id = req.params.id;

    const dataCliente = req.body;

    const updateCliente = await Cliente.update({
        razonSocial: dataCliente.razonSocial,
        nombreComercial: dataCliente.nombreComercial,
        direccionEntrega: dataCliente.direccionEntrega,
        telefono: dataCliente.telefono,
    }, {
        where: { id: id },

    });

    if(updateCliente === 0){
        return res.status(404).json({
            message: 'No se encontró el cliente con el id proporcionado',
        });
    }

    const clienteActualizado = await Cliente.findOne({
        where: { id: id },
    });

    res.status(200).json({
        message: 'Cliente actualizado con exito',
        data: clienteActualizado,
    });
}

module.exports = {
    postCliente,
    updateCliente,
    postClienteUsuario,
}