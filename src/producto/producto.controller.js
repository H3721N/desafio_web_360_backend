const Producto = require('./producto.model');

const postProducto = async (req, res) => {
    try {
        const dataProducto = req.body;
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
            foto: dataProducto.foto,
        });
        res.status(200).json({
            message: 'Producto creado de manera exitosa',
            data: createProducto,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear el producto',
            error: error.message,
        });
    }
};

const updateProducto = async (req, res) => {
    const id = req.params.id;
    const dataProducto = req.body;

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
        foto: dataProducto.foto,
    }, {
        where: { id: id },
    });
    if(updateProducto === 0){
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
}

module.exports = {
    postProducto,
    updateProducto
}