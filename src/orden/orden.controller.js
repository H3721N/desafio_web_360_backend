const Orden = require ('./orden.model')
const OrdenDetalle = require ('../ordenDetalles/ordenDetalle.model')
const Estado = require ('../estado/estado.model')

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

const updateOrden = async (req, res) => {
    try {
        const dataOrden = req.body;
        const id = req.params.id;
        console.log('La orden es: ', dataOrden);
        const updateOrden = await Orden.update({
            idEstado: dataOrden.idEstado,
        }, {
            where: { id: id }
        });

        const getOrden = await Orden.findOne({
            where: { id: id },
        });

        const getEstado = await Estado.findOne({
            where: { id: dataOrden.idEstado },
        });

        res.status(200).json({
            message: 'Orden actualizada con exito',
            data: getOrden, getEstado
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
    updateOrden
}