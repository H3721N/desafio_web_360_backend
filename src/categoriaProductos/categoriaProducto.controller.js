const CategoriaProductos = require('./ctegoriaProducto.model');
const postCategoriaProducto = async (req, res) => {
    const dataCategoriaProducto = req.body;
    const createCategoriaProducto = await CategoriaProductos.create({
        usuarios_idusuarios: dataCategoriaProducto.usuarios_idusuarios,
        nombre: dataCategoriaProducto.nombre,
        estados_idestados: dataCategoriaProducto.estados_idestados,
        fecha_creacion: dataCategoriaProducto.fecha_creacion,
    });
    res.status(200).json({
        ok: true,
        status: 200,
        message: 'Categoria creada de manera exitosa',
        data: createCategoriaProducto,
    });
}

const updateCategoriaProducto = async (req, res) =>{
    const id = req.params.idCategoriaProductos;
    const dataCategoriaProducto = req.body;
    const updateCategoriaProducto = await CategoriaProductos.update({
        usuarios_idusuarios: dataCategoriaProducto.usuarios_idusuarios,
        nombre: dataCategoriaProducto.nombre,
        estados_idestados: dataCategoriaProducto.estados_idestados,
        fecha_creacion: dataCategoriaProducto.fecha_creacion,
    },{
        where: { idCategoriaProductos: id }
    });
    if(updateCategoriaProducto == 0){
        return res.status(404).json({
            ok: false,
            status: 404,
            message: 'No se encontró la categoria con el id proporcionado',
        });
    }
    const categoriaActualizada = await CategoriaProductos.findOne({
        where: { idCategoriaProductos: id },
    });
    res.status(200).json({
        ok: true,
        status: 200,
        message: 'Categoria actualizada con exito',
        data: categoriaActualizada,
    });
}

module.exports = {
    postCategoriaProducto,
    updateCategoriaProducto
}