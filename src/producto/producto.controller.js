const Producto = require('./producto.model');

const postProducto = async (req, res) => {
    const dataProducto = req.body;
    const createProducto = await Producto.create({
        CategoriasProductos_idCategoriaProductos: dataProducto.CategoriasProductos_idCategoriaProductos,
        usuarios_idusuarios: dataProducto.usuarios_idusuarios,
        nombre: dataProducto.nombre,
        marca: dataProducto.marca,
        codigo: dataProducto.codigo,
        stock: dataProducto.stock,
        estados_idestados: dataProducto.estados_idestados,
        precios: dataProducto.precios,
        fecha_creacion: dataProducto.fecha_creacion,
        foto: dataProducto.foto,
    });
    res.status(200).json({
        ok: true,
        status: 200,
        message: 'Producto creado de manera exitosa',
        data: createProducto,
    });
};

const updateProducto = async (req, res) => {
    const id = req.params.idProductos;
    const dataProducto = req.body;

    const updateProducto = await Producto.update({
        CategoriasProductos_idCategoriaProductos: dataProducto.CategoriasProductos_idCategoriaProductos,
        usuarios_idusuarios: dataProducto.usuarios_idusuarios,
        nombre: dataProducto.nombre,
        marca: dataProducto.marca,
        codigo: dataProducto.codigo,
        stock: dataProducto.stock,
        estados_idestados: dataProducto.estados_idestados,
        precios: dataProducto.precios,
        fecha_creacion: dataProducto.fecha_creacion,
        foto: dataProducto.foto,
    }, {
        where: { idProductos: id },
    });
    if(updateProducto == 0){
        return res.status(404).json({
            ok: false,
            status: 404,
            message: 'No se encontró el producto con el id proporcionado',
        });
    }
    const productoActualizado = await Producto.findOne({
        where: { idProductos: id },
    });
    res.status(200).json({
        ok: true,
        status: 200,
        message: 'Producto actualizado con exito',
        data: productoActualizado,
    });
}

module.exports = {
    postProducto,
    updateProducto
}