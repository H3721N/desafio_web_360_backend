const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const estadoRouter = require('../estado/estado.router');
const rolRouter = require('../rol/rol.router');
const clienteRouter = require('../clientes/cliente.router');
const usuarioRouter = require('../usuario/usuario.router');
const categoriaRouter = require('../categoriaProductos/categoriaProducto.routes');
const productoRouter = require('../producto/producto.routes');
const ordenDetalleRouter = require('../ordenDetalles/ordenDetalle.router');
const authRouter = require("../auth/auth.route");
const appRouter = require("../orden/orden.route")
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


app.use(cors());

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
app.use('/api/v1', appRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;