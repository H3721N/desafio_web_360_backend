const { verifyToken } = require('../helpers/generarToken');
const User = require('../usuario/usuario.model');
const { where } = require("sequelize");

const checkRoleAuth = (roles) => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        console.log('token = ', token);
        const tokenData = await verifyToken(token);

        console.log(tokenData);

        if (!tokenData) {
            return res.status(401).send({ error: 'Invalid token' });
        }

        console.log('rol recibido = ', roles);

        const user = await User.findOne({ where: { id: tokenData.id } });

        if (!user) {
            return res.status(401).send({ error: 'User not found' });
        }

        req.user = user;
        req.user.rol = tokenData.userRol;

        console.log('rol del usuario = ', tokenData.userRol);
        console.log('roles permitidos = ', roles);

        if (roles.includes(tokenData.userRol)) {
            next();
        } else {
            res.status(401).send({ error: 'Este usuario no cuenta con el permiso para realizar esta acción' });
        }
    } catch (error) {
        res.status(401).send({ error: 'Este usuario no cuenta con el permiso para realizar esta acción' });
    }
};

module.exports = {
    checkRoleAuth
};