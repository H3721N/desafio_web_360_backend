const Estado = require('./estado.model');

const getEstados = async (req, res) => {
    try {
        const estados = await Estado.findAll();
        res.status(200).json({
            success: true,
            data: estados,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'hubo un error al recuperar los estados.',
        });
    }
};

const getEstadoById = async (req, res) => {
    const id = req.params.id;
    console.log('buscando el id: ', id);

    try {
        const estado = await Estado.findOne({
            where: {
                id: id,
            },
        });

        if (!estado) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: 'no se encontró el estado con el id proporcionado',
            });
        }

        res.status(200).json({
            ok: true,
            status: 200,
            body: estado,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: 'error interno del servidor',
        });
    }
};


const createEstado = async (req, res) => {
    const dataEstados = req.body;
try {
    await Estado.sync();
    const createEstado = await Estado.create({
        nombre: dataEstados.nombre,
    });
    res.status(200).json({
        message: 'Estado creado con exito',
        data: createEstado,
    });
} catch (error) {
    console.error(error);
    res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error interno del servidor',
    });
}
};

const updateEstado = async (req, res) => {
    try {
    const id = req.params.id;

    console.log('buscando el id: ', id);
    const dataEstados = req.body;
    console.log(req.body);
    const updateEstado = await Estado.update({
            nombre: dataEstados.nombre,
        },
        {
            where: { id: id },
        });
    if (updateEstado === 0) {
        return res.status(404).json({
            ok: false,
            status: 404,
            message: 'no se encontró el estado con el id proporcionado',
        });
    }
    const estadoActualizado = await Estado.findOne({
        where: { id: id },
    });

    res.status(200).json({
        ok: true,
        status: 200,
        message: 'Estado actualizado con exito',
        body: estadoActualizado
    });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: 'Error interno del servidor',
        });
    }
};

const deleteEstado = async (req, res) => {
    const id = req.params.id;
    const deleteEstado = await Estado.destroy({
        where: {
            id: id,
        },
    });
    if (deleteEstado === 0) {
        return res.status(404).json({
            ok: false,
            status: 404,
            message: 'No se encontró el estado con el id proporcionado',
        });
    }
    res.status(204).json({
        ok: true,
        status: 204,
        message: 'Estado eliminado con exito',
        body: deleteEstado,
    });
};

module.exports = {
    getEstados,
    getEstadoById,
    createEstado,
    updateEstado,
    deleteEstado
};