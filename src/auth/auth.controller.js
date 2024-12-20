//const { httpError } = require('../helpers/handleError');
const { encrypt, compare } = require('../helpers/handleBcrypt');
const { tokenSign } = require('../helpers/generarToken');
const Usuario = require('../usuario/usuario.model');
const bcrypt = require('bcryptjs');

const loginCtrl = async (req, res) => {
    try {
        const dataLogin = req.body;

        const user = await Usuario.findOne({where: {email: dataLogin.email}});
        console.log(' user = ', user);

        if (!user){
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const checkPassword = await bcrypt.compare(dataLogin.password, user.password);
        if (!checkPassword) {
            return res.status(401).json({ error: 'contraseña incorrecta' });
        }

        const tokenSession = await tokenSign(user);

        return res.status(200).json({
            message: 'inicio de sesión exitoso',
            data: user,
            token: tokenSession,
        });

    }catch(error){
        res.status(500).json({
            message: 'Error interno del servidor'
            ,error: error.message
        })
    }


}

module.exports = {
    loginCtrl
}