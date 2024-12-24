const router = require ('express').Router();

const { postOrden, updateOrden} = require('./orden.controller');

router.post('/orden', postOrden);

router.put('/orden/:id', updateOrden);

module.exports = router;