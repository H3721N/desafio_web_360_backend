const Rol = require('./rol.model');
const {where} = require("sequelize");

const getRoles = async (req, res) => {
    try {
        const roles = await Rol.findAll();
        res.status(200).json({
            success: true,
            data: roles,
        });
    }catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'hubo un error al recuperar los roles.',
        });
    }
};

const getRolById = async (req, res) => {
    const id = req.params.idrol;
    console.log('buscando el id: ', id);

    try {
        const rol = await Rol.findOne({
            where: {
                idrol: id,
            },
        });

        if (!rol) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: 'no se encontró el rol con el id proporcionado',
            });
        }

        res.status(200).json({
            ok: true,
            status: 200,
            body: rol,
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

const createRol = async (req, res) => {
    const dataRoles = req.body;
    await Rol.sync();
    console.log('creando rol: ', dataRoles);
    const createRol = await Rol.create({
        nombre: dataRoles.nombre,
    });
    res.status(200).json({
        success: true,
        data: createRol,
    });
}

const updateRol = async (req, res) => {
    const id = req.params.idrol;

    console.log('buscando el id: ', id);

    const dataRoles = req.body;

    const updateRol = await Rol.update({
        nombre: dataRoles.nombre,
    },{
        where: { idrol: id },
    });

    if (updateRol[0] === 0) {
        return res.status(404).json({
            ok: false,
            status: 404,
            message: 'no se encontró el rol con el id proporcionado',
        });
    };

    const rolActualizado = await Rol.findOne({
        where: { idrol: id },
    });

    res.status(200).json({
        ok: true,
        status: 200,
        message: 'Rol actualizado con éxito',
        body: rolActualizado
    })

}

module.exports = {
    getRoles,
    getRolById,
    createRol,
    updateRol,
};