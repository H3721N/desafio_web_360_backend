const Cliente = require('./cliente.model');

const postCliente = async (req, res) => {
    const dataCliente = req.body;
    const createCliente = await Cliente.create({
        razon_social: dataCliente.razon_social,
        nombre_comercial: dataCliente.nombre_comercial,
        direccion_entrega: dataCliente.direccion_entrega,
        telefono: dataCliente.telefono,
        email: dataCliente.email,
    })
    res.status(200).json({
        ok: true,
        status: 200,
        message: 'Cliente creado de manera exitosa',
        data: createCliente,
    });
};

const updateCliente = async (req, res) => {
    const id = req.params.idcliente;

    const dataCliente = req.body;

    const updateCliente = await Cliente.update({
        razon_social: dataCliente.razon_social,
        nombre_comercial: dataCliente.nombre_comercial,
        direccion_entrega: dataCliente.direccion_entrega,
        telefono: dataCliente.telefono,
        email: dataCliente.email,
    }, {
        where: { idcliente: id },

    });

    if(updateCliente == 0){
        return res.status(404).json({
            ok: false,
            status: 404,
            message: 'No se encontró el cliente con el id proporcionado',
        });
    }

    const clienteActualizado = await Cliente.findOne({
        where: { idcliente: id },
    });

    res.status(200).json({
        ok: true,
        status: 200,
        message: 'Cliente actualizado con exito',
        data: clienteActualizado,
    });
}

module.exports = {
    postCliente,
    updateCliente
}