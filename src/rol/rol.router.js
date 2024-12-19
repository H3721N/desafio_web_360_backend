const router = require('express').Router();
const { getRoles,
        getRolById,
        createRol,
        updateRol} = require('./rol.controller');
const {where} = require("sequelize");

router.get('/rol', getRoles);

router.get('/rol/:idrol', getRolById);

router.post('/rol', createRol);

router.put('/rol/:idrol', updateRol);


module.exports = router;