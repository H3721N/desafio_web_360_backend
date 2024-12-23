const router =require('express').Router();
const { faker } = require('@faker-js/faker');
const { getEstados,
        getEstadoById,
        createEstado,
        updateEstado,
        deleteEstado } = require('./estado.controller');
const Estado = require('./estado.model');
const {where} = require("sequelize");
const {checkToken} = require("../middleware/checkToken");
const {validateEstados} = require("../validators/validators");
const {checkRoleAuth} = require("../middleware/checkRoleAuth");

router.get('/estado', getEstados);

router.get('/estado/:id', getEstadoById);

router.post('/estado',
    checkToken,
    validateEstados,
    checkRoleAuth(['Admin']),
    createEstado);

router.put('/estado/:id',
    checkToken,
    validateEstados,
    checkRoleAuth(['Admin']),
    updateEstado);

router.delete('/estado/:id', deleteEstado);

module.exports = router;