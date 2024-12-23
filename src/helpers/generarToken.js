const jwt = require('jsonwebtoken');

const tokenSign = async (user, rol) => {
    console.log('user = ', user.idRol)
    console.log('rol = ', rol);
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            userRol: rol
        },
        process.env.SECRET_KEY,
        {
            expiresIn: process.env.TIME_EXPIRATION_TOKEN
        }
    )
}

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.SECRET_KEY);
    }catch (e){
        return null;
    }
}

module.exports = {
    tokenSign,
    verifyToken
}