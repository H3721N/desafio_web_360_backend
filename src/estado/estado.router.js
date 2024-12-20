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

router.get('/estado/:id', getEstadoById);

router.post('/estado', createEstado);

router.put('/estado/:id', updateEstado);

router.delete('/estado/:id', deleteEstado);

module.exports = router;