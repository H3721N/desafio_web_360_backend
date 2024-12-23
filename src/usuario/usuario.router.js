const router = require('express').Router();
const { postUsuario,
        updateUsuario } = require('./usuario.controller');
const {checkToken} = require("../middleware/checkToken");
const {validateUsuarios} = require("../validators/validators");
const {checkRoleAuth} = require("../middleware/checkRoleAuth");

router.post('/usuario',
    validateUsuarios,
    postUsuario);

router.put('/usuario/:id',
    checkToken,
    validateUsuarios,
    updateUsuario);

module.exports = router;