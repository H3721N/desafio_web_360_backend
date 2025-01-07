const router = require('express').Router();
const { getRoles,
        getRolById,
        createRol,
        updateRol} = require('./rol.controller');
const {where} = require("sequelize");
const {checkToken} = require("../middleware/checkToken");
const {validateRol} = require("../validators/validators");
const {checkRoleAuth} = require("../middleware/checkRoleAuth");

router.get('/rol', getRoles);

router.get('/rol/:id', getRolById);

router.post('/rol',
    checkToken,
    validateRol,
    checkRoleAuth(['operador']),
    createRol);

router.put('/rol/:id',
    checkToken,
    validateRol,
    checkRoleAuth(['operador']),
    updateRol);


module.exports = router;