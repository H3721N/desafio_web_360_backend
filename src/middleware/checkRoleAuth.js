const { verifyToken } = require('../helpers/generarToken');
const user = require('../usuario/usuario.model');
const role = require ('../rol/rol.model')
const {where} = require("sequelize");

const checkRoleAuth = (rol) => async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ').pop();
        console.log('token = ', token)
        const tokenData = await verifyToken(token);

        console.log(tokenData)

        if (!tokenData) {
            return res.status(401).send({ error: 'Invalid token' });
        }

        console.log('rol recivido = ', rol)

        if (tokenData.userRol === 'Admin' || tokenData.userRol === 'Administrador') {
            next();
        } else {
            res.status(401).send({ error: 'Este usuario no cuenta con el permiso para realizar esta accion' });
        }
    }catch(error){
        res.status(401);
        res.send({error: 'Este usuario no cuenta con el permiso para realizar esta accion'})
    }
}

module.exports = {
    checkRoleAuth
}