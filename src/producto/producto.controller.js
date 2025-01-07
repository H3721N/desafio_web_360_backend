const Producto = require('./producto.model');
const { Op } = require('sequelize');


const postProducto = async (req, res) => {
    try {
        const dataProducto = req.body;
        console.log('Datos del producto recibidos:', dataProducto);  // Verificar los datos

        const createProducto = await Producto.create({
            idCategoria: dataProducto.idCategoria,
            idUsuario: dataProducto.idUsuario,
            nombre: dataProducto.nombre,
            marca: dataProducto.marca,
            codigo: dataProducto.codigo,
            stock: dataProducto.stock,
            idEstado: dataProducto.idEstado,
            precios: dataProducto.precios,
            fechaCreacion: dataProducto.fechaCreacion,
            foto: dataProducto.foto ? Buffer.from(dataProducto.foto, 'base64') : null,
        });

        res.status(200).json({
            message: 'Producto creado de manera exitosa',
            data: createProducto,
        });
    } catch (error) {
        console.error('Error al crear el producto:', error);  // Log adicional de error
        res.status(500).json({
            message: 'Error al crear el producto',
            error: error.message,
        });
    }
};


const updateProducto = async (req, res) => {
    const id = req.params.id;
    const dataProducto = req.body;

    try {
        const updateProducto = await Producto.update({
            idCategoria: dataProducto.idCategoria,
            idUsuario: dataProducto.idUsuario,
            nombre: dataProducto.nombre,
            marca: dataProducto.marca,
            codigo: dataProducto.codigo,
            stock: dataProducto.stock,
            idEstado: dataProducto.idEstado,
            precios: dataProducto.precios,
            fechaCreacion: dataProducto.fechaCreacion,
            foto: dataProducto.foto ? Buffer.from(dataProducto.foto, 'base64') : null,
        }, {
            where: { id: id },
        });

        if (updateProducto[0] === 0) {
            return res.status(404).json({
                message: 'No se encontró el producto con el id proporcionado',
            });
        }

        const productoActualizado = await Producto.findOne({
            where: { id: id },
        });

        res.status(200).json({
            message: 'Producto actualizado con exito',
            data: productoActualizado,
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar el producto',
            error: error.message,
        });
    }
}

const getProducto = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.size) || 10;
        const offset = (page - 1) * pageSize;
        const limit = pageSize;

        const whereCondition = {};

        const minPrice = parseFloat(req.query.minPrice);
        const maxPrice = parseFloat(req.query.maxPrice) || Number.MAX_VALUE;
        console.log(maxPrice)
        if (minPrice >= 0 && maxPrice < Number.MAX_VALUE) {
            whereCondition.precios = {
                [Op.between]: [minPrice, maxPrice]
            };
        }

        const searchFilter = req.query.searchFilter;
        if (searchFilter) {
            whereCondition.nombre = {
                [Op.like]: `%${searchFilter}%`
            };
        }


        const { count: total, rows: productos } = await Producto.findAndCountAll({
            offset: offset,
            limit: limit,
            where: whereCondition,
        });

        const productosConImagen = productos.map(producto => {
            return {
                ...producto.toJSON(),
                foto: producto.foto ? Buffer.from(producto.foto).toString('base64') : null
            };
        });

        res.status(200).json({
            success: true,
            data: productosConImagen,
            pagination: {
                totalItems: total,
                totalPages: Math.ceil(total / pageSize),
                currentPage: page,
                pageSize: pageSize
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Hubo un error al recuperar los productos.',
        });
    }
};

const getProductoByPriceRange = async (req, res) => {
    try {


        const productos = await Producto.findAll({

        });

        const productosConImagen = productos.map(producto => ({
            ...producto.toJSON(),
            foto: producto.foto ? Buffer.from(producto.foto).toString('base64') : null
        }));

        res.status(200).json({
            success: true,
            data: productosConImagen
        });
    } catch (error) {
        console.error('Error al obtener los productos por rango de precio:', error);
        res.status(500).json({
            success: false,
            message: 'Hubo un error al recuperar los productos por rango de precio.',
            error: error.message
        });
    }
};

module.exports = {
    postProducto,
    updateProducto,
    getProducto,
    getProductoByPriceRange
};
