const Orden = require ('./orden.model')
const OrdenDetalle = require ('../ordenDetalles/ordenDetalle.model')
const Estado = require ('../estado/estado.model')
const Cliente = require ('../clientes/cliente.model')

const postOrden = async (req, res) => {
    try {
        const dataOrden = req.body;
        console.log('La orden es: ', dataOrden);
        const ordenDetalle = dataOrden.ordenDetalle;
        console.log('ordenDetalle',dataOrden.ordenDetalle)

        const totalOrden = ordenDetalle.reduce((total, detalle) => {
            const subTotal = detalle.cantidad * detalle.precio;
            return total + subTotal;
        }, 0);

        const cliente = await Cliente.findOne({ where: { email: dataOrden.email } });
        if (!cliente) {
            return res.status(400).json({
                message: 'El email no pertenece a ningun cliente registrad'
            });
        }


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
            total: totalOrden,
        });
        if (ordenDetalle.length > 0) {
            for (const detalle of ordenDetalle) {
                const subTotal = detalle.cantidad * detalle.precio;
                await OrdenDetalle.create({
                    idOrden: createOrden.id,
                    idProducto: detalle.idProducto,
                    cantidad: detalle.cantidad,
                    precio: detalle.precio,
                    subtotal: subTotal
                });
                console.log('subTotal', subTotal);
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
            data: updateOrden, getOrden, getEstado
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