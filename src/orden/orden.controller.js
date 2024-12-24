const Orden = require ('./orden.model')
const OrdenDetalle = require ('../ordenDetalles/ordenDetalle.model')

const postOrden = async (req, res) => {
    try {
        const dataOrden = req.body;
        console.log('La orden es: ', dataOrden);
        const ordenDetalle = dataOrden.ordenDetalle;
        console.log('ordenDetalle',dataOrden.ordenDetalle)
        const createOrden = await Orden.create({
            id: dataOrden.id,
            idUsuario: dataOrden.idUsuario,
            idEstado: dataOrden.idEstado,
            fecha: dataOrden.fecha,
            nombre: dataOrden.nombre,
            direccion: dataOrden.direccion,
            telefono: dataOrden.telefono,
            email: dataOrden.email,
            fechaEntrega: dataOrden.fechaEntrega,
            total: dataOrden.total,
        });

        if (ordenDetalle.length > 0) {
            for (const detalle of ordenDetalle) {
                await OrdenDetalle.create({
                    idOrden: createOrden.id,
                    idProducto: detalle.idProducto,
                    cantidad: detalle.cantidad,
                    precio: detalle.precio,
                    subtotal: detalle.subtotal,
                });
            }
        }

        res.status(200).json({
            message: 'Orden creada con exito',
            data: createOrden, ordenDetalle
        });

    }catch(error){
        res.status(500).json({
            message: error,
            error: error.message,

        })
    }
}

module.exports = {
    postOrden,
}