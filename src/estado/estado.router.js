const router =require('express').Router();
const { faker } = require('@faker-js/faker');
const { getEstados,
        getEstadoById,
        createEstado,
        updateEstado,
        deleteEstado } = require('./estado.controller');
const Estado = require('./estado.model');
const {where} = require("sequelize");

router.get('/estado', getEstados);

router.get('/estado/:idestados', getEstadoById);

router.post('/estado', createEstado);

router.put('/estado/:idestados', updateEstado);

router.delete('/estado/:idestados', deleteEstado);

module.exports = router;