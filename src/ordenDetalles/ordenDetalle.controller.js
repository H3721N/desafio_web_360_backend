const OrdenDetalle = require('./ordenDetalle.model');

const postOrdenDetalle = async (req, res) => {
    const dataOrdenDetalle = req.body;
    console.log('La orden detalle es: ', dataOrdenDetalle);
    const createOrdenDetalle = await OrdenDetalle.create({
        Orden_idOrden: dataOrdenDetalle.Orden_idOrden,
        Productos_idProductos: dataOrdenDetalle.Productos_idProductos,
        cantidad: dataOrdenDetalle.cantidad,
        precio: dataOrdenDetalle.precio,
        subtotal: dataOrdenDetalle.subtotal,
    });
    res.status(200).json({
        ok: true,
        status: 200,
        message: 'Orden detalle creada con exito',
        data: createOrdenDetalle,
    });
}

const putOrdenDetalle = async (req, res) => {
    const dataOrdenDetalle = req.body;
    const id = req.params.idOrdenDetalles;
    console.log('La orden detalle es: ', dataOrdenDetalle);
    const updateOrdenDetalle = await OrdenDetalle.update({
        orden_idorden: dataOrdenDetalle.orden_idorden,
        producto_idproducto: dataOrdenDetalle.producto_idproducto,
        cantidad: dataOrdenDetalle.cantidad,
        precio: dataOrdenDetalle.precio,
        subtotal: dataOrdenDetalle.subtotal,
    }, {
        where: { idOrdenDetalles: id }
    });
    if(updateOrdenDetalle === 0){
        return res.status(404).json({
            ok: false,
            status: 404,
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

}

module.exports = {
    postOrdenDetalle,
    putOrdenDetalle
}