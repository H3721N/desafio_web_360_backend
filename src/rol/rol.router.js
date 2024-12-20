const router = require('express').Router();
const { getRoles,
        getRolById,
        createRol,
        updateRol} = require('./rol.controller');
const {where} = require("sequelize");

router.get('/rol', getRoles);

router.get('/rol/:id', getRolById);

router.post('/rol', createRol);

router.put('/rol/:id', updateRol);


module.exports = router;