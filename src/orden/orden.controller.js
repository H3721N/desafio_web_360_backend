const Orden = require ('./orden.model')
const OrdenDetalle = require ('../ordenDetalles/ordenDetalle.model')
const Producto = require ('../producto/producto.model')
const Estado = require ('../estado/estado.model')
const Cliente = require ('../clientes/cliente.model')
const sequelize = require('../db/mysql');
const Sequelize = require('sequelize');


const postOrden = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const dataOrden = req.body;
        console.log('La orden es: ', dataOrden);
        const ordenDetalle = dataOrden.ordenDetalle;
        console.log('ordenDetalle', dataOrden.ordenDetalle);

        for (const detalle of ordenDetalle) {
            const getProducto = await Producto.findOne({
                where: { id: detalle.idProducto },
                transaction
            });

            if (detalle.cantidad > getProducto.stock) {
                await transaction.rollback();
                return res.status(400).json({
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

        const estado = await Estado.findByPk(dataOrden.idEstado);
        if (!estado) {
            await transaction.rollback();
            return res.status(400).json({
                message: 'Estado no encontrado'
            });
        }

        const createOrden = await Orden.create({
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
                    where: { id: detalle.idProducto },
                    transaction
                });

                await Producto.update({
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
            data: { createOrden, ordenDetalle }
        });

    } catch (error) {
        console.log('Error', error);
        await transaction.rollback();
        res.status(500).json({
            message: 'Error interno del servidor',
            error: error.message,
        });
    }
};


const updateOrden = async (req, res) => {
    const transaction = await sequelize.transaction();
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

const getOrden = async (req, res) => {
    try {
        console.log('User:', req.user.rol, ' ID:', req.user.id);
        if (!req.user || !req.user.rol || !req.user.id) {
            return res.status(400).json({
                message: 'user information is missing or incomplete'
            });
        }

        const userRole = req.user.rol;
        const userId = req.user.id;

        console.log('User Role:', userRole);
        console.log('User ID:', userId);

        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.size) || 10;
        const offset = (page - 1) * pageSize;
        const limit = pageSize;

        let ordenes;

        if (userRole === 'operador' || userRole === 'Administrador') {
            ordenes = await Orden.findAll({
                include: [
                    {
                        model: OrdenDetalle,
                        as: 'ordenDetalles',
                    },
                    {
                        model: Estado,
                        as: 'Estado',
                    }
                ],
                limit: limit,
                offset: offset
            });
        } else {
            ordenes = await Orden.findAll({
                where: { idUsuario: userId },
                include: [
                    {
                        model: OrdenDetalle,
                        as: 'ordenDetalles',
                    },
                    {
                        model: Estado,
                        as: 'Estado',
                    }
                ],
                limit: limit,
                offset: offset
            });
        }

        console.log('Ordenes:', ordenes);

        const totalOrdenes = await Orden.count();

        res.status(200).json({
            message: 'ordenes obtenidas con éxito',
            data: ordenes,
            pagintation: {
                totalOrden: totalOrdenes,
                page: page,
                pageSize: pageSize,
                totalPage: Math.ceil(totalOrdenes / pageSize),
            }
        });
    } catch (error) {
        console.error('error al obtener las ordenes:', error);
        res.status(500).json({
            message: 'error al obtener las ordenes',
            error: error.message
        });
    }
};

const getOrdenDetalleByOrdenId = async (req, res) => {
    try {
        const idOrden = req.params.id;
        if (!idOrden) {
            return res.status(400).json({
                message: 'El id de la orden es requerido',
            });
        }

        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.size) || 10;
        const offset = (page - 1) * pageSize;
        const limit = pageSize;

        const orden = await Orden.findOne({
            where: { id: idOrden },

            include: [{
                model: OrdenDetalle,
                as: 'ordenDetalles',
                include: [{
                    model: Producto,
                    as: 'Producto',
                    attributes: ['id', 'nombre']
                }]
            }],
            offset: offset,
            limit: limit
        });

        if (!orden) {
            return res.status(404).json({
                message: 'No se encontró la orden para el id proporcionado',
            });
        }

        const totalOrdenDetalles = await OrdenDetalle.count({ where: { idOrden: idOrden } });

        res.status(200).json({
            message: 'Detalles de orden obtenidos con éxito',
            data: orden,
            orden:  orden.ordenDetalles,
            pagination: {
                totalOrdenDetalles: totalOrdenDetalles,
                page: page,
                pageSize: pageSize,
                totalPage: Math.ceil(totalOrdenDetalles / pageSize),
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los detalles de la orden',
            error: error.message,
        });
    }
};

const cancelarOrden = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const idOrden = req.params.id;
        if (!idOrden) {
            return res.status(400).json({
                message: 'El id de la orden es requerido',
            });
        }

        const orden = await Orden.findOne({
            where: { id: idOrden },
            include: [{
                model: OrdenDetalle,
                as: 'ordenDetalles',
                include: [{
                    model: Producto,
                    as: 'Producto'
                }]
            }],
            transaction
        });

        if (!orden) {
            await transaction.rollback();
            return res.status(404).json({
                message: 'No se encontró la orden para el id proporcionado',
            });
        }

        await Orden.update({
            idEstado: 3
        }, {
            where: { id: idOrden },
            transaction
        });

        for (const detalle of orden.ordenDetalles) {
            const producto = await Producto.findOne({
                where: { id: detalle.idProducto },
                transaction
            });

            await Producto.update({
                stock: producto.stock + detalle.cantidad,
            }, {
                where: { id: detalle.idProducto },
                transaction
            });
        }

        await transaction.commit();

        res.status(200).json({
            message: 'Orden cancelada con éxito',
            data: orden
        });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({
            message: 'Error al cancelar la orden',
            error: error.message,
        });
    }
};

const entregarOrden = async (req, res) => {
    try {
        const idOrden = req.params.id;
        if (!idOrden) {
            return res.status(400).json({
                message: 'El id de la orden es requerido',
            });
        }
        const updateOrden = await Orden.update({
            idEstado: 4,
            fechaEntrega: new Date().toISOString().split('T')[0]
        }, {
            where: { id: idOrden }
        });
        const orden = await Orden.findOne({
            where: { id: idOrden }
        });
        res.status(200).json({
            message: 'Orden entregada con éxito',
            data: orden
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al entregar la orden',
            error: error.message,
        });
    }
}

module.exports = {
    postOrden,
    updateOrden,
    getOrden,
    getOrdenDetalleByOrdenId,
    cancelarOrden,
    entregarOrden
}