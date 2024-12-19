const Usuario = require('./usuario.model');
const { encrypt } = require('../helpers/handleBcrypt');

const postUsuario = async (req, res) => {
    try {
        const dateUsuario = req.body;
        const passwordHash = await encrypt(dateUsuario.password);
        const fecha_creacion = new Date();

        console.log('passwordHash = ', passwordHash);

        const createUsuario = await Usuario.create({
            rol_idrol: dateUsuario.rol_idrol,
            estados_idestados: dateUsuario.estados_idestados,
            correo_electronico: dateUsuario.correo_electronico,
            nombre_completo: dateUsuario.nombre_completo,
            password: passwordHash,
            telefono: dateUsuario.telefono,
            fecha_nacimiento: dateUsuario.fecha_nacimiento,
            fecha_creacion: fecha_creacion,
            Clientes_idClientes: dateUsuario.Clientes_idClientes,
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Usuario creado de manera exitosa',
            data: createUsuario,
        });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: 'Error al crear el usuario',
            error: error.message,
        });
    }
}

const updateUsuario = async (req, res) => {
    const id = req.params.idusuarios;
    const dataUsuario = req.body;

    console.log('id = ', id);

    const updateUsuario = await Usuario.update({
        rol_idrol: dataUsuario.rol_idrol,
        estados_idestados: dataUsuario.estados_idestados,
        correo_electronico: dataUsuario.correo_electronico,
        nombre_completo: dataUsuario.nombre_completo,
        password: dataUsuario.password,
        telefono: dataUsuario.telefono,
        fecha_nacimiento: dataUsuario.fecha_nacimiento,
        fecha_creacion: dataUsuario.fecha_creacion,
    }, {
        where: { idusuarios: id }
    });

    if(updateUsuario === 0){
        return res.status(404).json({
            ok: false,
            status: 404,
            message: 'No se encontró el cliente con el id proporcionado',
        });
    }

    const usuarioActualizado = await Usuario.findOne({
        where: { idusuarios: id },
    });

    res.status(200).json({
        ok: true,
        status: 200,
        message: 'Usuario actualizado con exito',
        data: usuarioActualizado,
    });
}

module.exports = {
    postUsuario,
    updateUsuario
}