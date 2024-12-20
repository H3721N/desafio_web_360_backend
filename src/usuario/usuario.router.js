const router = require('express').Router();
const { postUsuario,
        updateUsuario } = require('./usuario.controller');

router.post('/usuario', postUsuario);

router.put('/usuario/:id', updateUsuario);

module.exports = router;