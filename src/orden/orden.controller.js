const Orden = require ('./orden.model')
const OrdenDetalle = require ('../ordenDetalles/ordenDetalle.model')
const Producto = require ('../producto/producto.model')
const Estado = require ('../estado/estado.model')
const Cliente = require ('../clientes/cliente.model')
const sequelize = require('../db/mysql');

const postOrden = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const dataOrden = req.body;
        console.log('La orden es: ', dataOrden);
        const ordenDetalle = dataOrden.ordenDetalle;
        console.log('ordenDetalle',dataOrden.ordenDetalle);

        for (const detalle of ordenDetalle) {
            const getProducto = await Producto.findOne({
                where: { id: detalle.idProducto },
                transaction
            });

            if(detalle.cantidad > getProducto.stock){
                await transaction.rollback();
                res.status(400).json({
                    message: 'No hay suficiente stock'
                });
            }
        }

        const totalOrden = ordenDetalle.reduce((total, detalle) => {
            const subTotal = detalle.cantidad * detalle.precio;
            return total + subTotal;
        }, 0);

        const cliente = await Cliente.findOne({ where: { email: dataOrden.email } });
        if (!cliente) {
            await transaction.rollback();
            return res.status(400).json({
                message: 'El email no pertenece a ningun cliente registrado'
            });
        }


        const createOrden = await Orden.create({
            id: dataOrden.id,
            idUsuario: dataOrden.idUsuario,
            idEstado: dataOrden.idEstado,
            fecha: dataOrden.fecha,
            nombre: dataOrden.nombre,
            direccion: cliente.direccionEntrega,
            telefono: dataOrden.telefono,
            email: dataOrden.email,
            fechaEntrega: dataOrden.fechaEntrega,
            total: totalOrden,
        }, { transaction });
        if (ordenDetalle.length > 0) {
            for (const detalle of ordenDetalle) {
                const subTotal = detalle.cantidad * detalle.precio;
                await OrdenDetalle.create({
                    idOrden: createOrden.id,
                    idProducto: detalle.idProducto,
                    cantidad: detalle.cantidad,
                    precio: detalle.precio,
                    subtotal: subTotal
                }, { transaction });
                console.log('subTotal', subTotal);

                const getProducto = await Producto.findOne({
                    where: {id: detalle.idProducto},
                    transaction
                });

                const updateProducto = await Producto.update({
                    stock: getProducto.stock - detalle.cantidad,
                }, {
                    where: { id: detalle.idProducto },
                    transaction
                });
            }
        }

        await transaction.commit();

        res.status(200).json({
            message: 'Orden creada con exito',
            data: createOrden, ordenDetalle
        });

    }catch(error){
        console.log('Error', error);
        await transaction.rollback();
        res.status(500).json({
            message: error,
            error: error.message,

        })
    }
}

const updateOrden = async (req, res) => {
    const transaction = await Sequelize.transaction();
    try {
        const dataOrden = req.body;
        const id = req.params.id;
        console.log('La orden es: ', dataOrden);
        const updateOrden = await Orden.update({
            idEstado: dataOrden.idEstado,
        }, {
            where: { id: id },
            transaction
        });

        const getOrden = await Orden.findOne({
            where: { id: id },
            transaction
        });

        const getEstado = await Estado.findOne({
            where: { id: dataOrden.idEstado },
            transaction
        });

        await transaction.commit();

        res.status(200).json({
            message: 'Orden actualizada con exito',
            data: updateOrden, getOrden, getEstado
        });
    }catch(error){
        await transaction.rollback();
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