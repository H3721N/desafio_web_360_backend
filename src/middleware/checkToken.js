const { verifyToken } = require('../helpers/generarToken');

const checkToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verifyToken(token);
        console.log('tokenData= ',tokenData);
        if(tokenData.id){
            next()
        }else{
            res.status(409);
            res.send({error: 'Token no valido'});
        }
    }catch (e){
        res.status(409);
        res.send({error: 'Token no valido'});
    }
};

module.exports = {
    checkToken
}