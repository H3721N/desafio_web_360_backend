const express = require('express');
const morgan = require('morgan');

const estadoRouter = require('../estado/estado.router');
const rolRouter = require('../rol/rol.router');
const clienteRouter = require('../clientes/cliente.router');
const usuarioRouter = require('../usuario/usuario.router');
const categoriaRouter = require('../categoriaProductos/categoriaProducto.routes');
const productoRouter = require('../producto/producto.routes');
const ordenDetalleRouter = require('../ordenDetalles/ordenDetalle.router');
const authRouter = require("../auth/auth.route");

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use(express.json());

app.use('/api/v1', estadoRouter);
app.use('/api/v1', rolRouter);
app.use('/api/v1', clienteRouter);
app.use('/api/v1', usuarioRouter);
app.use('/api/v1', categoriaRouter);
app.use('/api/v1', productoRouter);
app.use('/api/v1', ordenDetalleRouter);
app.use('/api/v1', authRouter);

module.exports = app;