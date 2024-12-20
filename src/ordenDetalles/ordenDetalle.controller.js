const OrdenDetalle = require('./ordenDetalle.model');

const postOrdenDetalle = async (req, res) => {
    try {
    const dataOrdenDetalle = req.body;
    console.log('La orden detalle es: ', dataOrdenDetalle);
    const createOrdenDetalle = await OrdenDetalle.create({
        idOrden: dataOrdenDetalle.idOrden,
        idProducto: dataOrdenDetalle.idProducto,
        cantidad: dataOrdenDetalle.cantidad,
        precio: dataOrdenDetalle.precio,
        subtotal: dataOrdenDetalle.subtotal,
    });
    res.status(200).json({
        message: 'Orden detalle creada con exito',
        data: createOrdenDetalle,
    });
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear la orden detalle',
            error: error.message,
        });
    }
}

const putOrdenDetalle = async (req, res) => {

    try {
        const dataOrdenDetalle = req.body;
        const id = req.params.id;
        console.log('La orden detalle es: ', dataOrdenDetalle);
        const updateOrdenDetalle = await OrdenDetalle.update({
            idOrden: dataOrdenDetalle.idOrden,
            idProducto: dataOrdenDetalle.idProducto,
            cantidad: dataOrdenDetalle.cantidad,
            precio: dataOrdenDetalle.precio,
            subtotal: dataOrdenDetalle.subtotal,
        }, {
            where: { id: id }
        });
        if(updateOrdenDetalle === 0){
            return res.status(404).json({
                message: 'No se encontró la orden detalle con el id proporcionado',
            });
        }
        const ordenProductoActualizado = await OrdenDetalle.findOne({
            where: { idOrdenDetalles: id },
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Orden detalle actualizada con exito',
            data: ordenProductoActualizado,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar la orden detalle',
            error: error.message,
        });
    }
}

module.exports = {
    postOrdenDetalle,
    putOrdenDetalle
}