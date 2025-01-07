const router = require('express').Router();
const { postUsuario,
        updateUsuario,
        getUsuarioById,
        getUsuario
} = require('./usuario.controller');
const {checkToken} = require("../middleware/checkToken");
const {validateUsuarios} = require("../validators/validators");
const {checkRoleAuth} = require("../middleware/checkRoleAuth");

router.post('/usuario',
    checkToken,
    checkRoleAuth('operador'),
    postUsuario);

router.put('/usuario/:id',
    checkToken,
    updateUsuario);

router.get('/usuario/:id',
    getUsuarioById);

router.get('/usuario',
    checkToken,
    checkRoleAuth('operador'),
    getUsuario);

module.exports = router;