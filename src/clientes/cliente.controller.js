const Cliente = require('./cliente.model');

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
    updateCliente
}