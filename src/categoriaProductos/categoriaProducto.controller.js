const CategoriaProductos = require('./ctegoriaProducto.model');
const postCategoriaProducto = async (req, res) => {
    try{
        const dataCategoriaProducto = req.body;
        console.log(dataCategoriaProducto);
        const createCategoriaProducto = await CategoriaProductos.create({
            idUsuario: dataCategoriaProducto.idUsuario,
            nombre: dataCategoriaProducto.nombre,
            idEstado: dataCategoriaProducto.idEstado,
            fechaCreacion: dataCategoriaProducto.fechaCreacion,
        });
        res.status(200).json({
            message: 'Categoria creada de manera exitosa',
            data: createCategoriaProducto,
        });
    }catch (error) {
        res.status(500).json({
            message: 'Error al crear la categoria',
            error: error.message,
        });
    }
}

const updateCategoriaProducto = async (req, res) =>{
    try{
        const id = req.params.id;
        const dataCategoriaProducto = req.body;
        const updateCategoriaProducto = await CategoriaProductos.update({
            idUsuario: dataCategoriaProducto.idUsuario,
            nombre: dataCategoriaProducto.nombre,
            idEstado: dataCategoriaProducto.idEstado,
            fechaCreacion: dataCategoriaProducto.fechaCreacion,
        },{
            where: { id: id }
        });
        if(updateCategoriaProducto === 0){
            return res.status(404).json({
                message: 'No se encontró la categoria con el id proporcionado',
            });
        }
        const categoriaActualizada = await CategoriaProductos.findOne({
            where: { id: id },
        });
        res.status(200).json({
            message: 'Categoria actualizada con exito',
            data: categoriaActualizada,
        });
    }catch (error) {
        res.status(500).json({
            message: 'Error al actualizar la categoria',
            error: error.message,
        });
    }
}

const getCategoriaProducto = async (req, res) => {
    try {
        const categoriaProductos = await CategoriaProductos.findAll();
        res.status(200).json({
            message: 'Lista de categorias',
            data: categoriaProductos,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener las categorias',
            error: error.message,
        });
    }
}

const getCategoriaProductoWithPage = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.size) || 10;
        const offset = (page - 1) * pageSize;
        const limit = pageSize;

        const { count: total, rows: categorias} = await CategoriaProductos.findAndCountAll({
            offset: offset,
            limit: limit,
        });

        res.status(200).json({
            success: true,
            data: categorias,
            pagination: {
                totalItems: total,
                totalPages: Math.ceil(total / pageSize),
                currentPage: page,
                pageSize: pageSize
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener las categorias',
            error: error.message,
        });
    }
}

module.exports = {
    postCategoriaProducto,
    updateCategoriaProducto,
    getCategoriaProducto,
    getCategoriaProductoWithPage,
}