const { check } = require('express-validator');

const { validateResult } = require('../helpers/validateHelper');

const validateCategoria = [
    check('idUsuario').exists().not().isEmpty().isInt().withMessage('El id debe de ser de tipo numerico'),
    check('nombre').exists().not().isEmpty().isString().isLength({max:45}).withMessage('El nombre no puede tener más de 45 caracteres'),
    check('idEstado').exists().not().isEmpty().isInt().withMessage('El id debe de ser de tipo numerico'),
    check('fechaCreacion').exists().not().isEmpty().isISO8601().withMessage('La fecha es invalida'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

const validateRol = [
    check('nombre').exists().not().isEmpty().isString().isLength({max:45}).withMessage('El nombre no puede tener más de 45 caracteres'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

const validateEstados = [
    check('nombre').exists().not().isEmpty().isString().isLength({max:45}).withMessage('El nombre no puede tener más de 45 caracteres'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

const validateClientes = [
    check('razonSocial').exists().not().isEmpty().isString().isLength({max:245}).withMessage('La razon social no puede tener más de 245 caracteres'),
    check('nombreComercial').exists().not().isEmpty().isString().isLength({max:345}).withMessage('El nombre no puede tener más de 45 caracteres'),
    check('direccionEntrega').exists().not().isEmpty().isString().isLength({max:45}).withMessage('La direccion no puede tener más de 45 caracteres'),
    check('telefono').exists().not().isEmpty().isString().isLength({max:45}).withMessage('El telefono no puede tener más de 45 caracteres'),
    check('email').if((value, { req }) => req.body.email !== undefined).isEmail().isLength({ max: 50 }).withMessage('el email que ingresó no es válido'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

const validateUsuarios = [
    check('idRol').exists().not().isEmpty().isInt(),
    check('idEstado').exists().not().isEmpty().isInt(),
    check('email').if((value, { req }) => req.body.email !== undefined).isEmail().isLength({ max: 50 }).withMessage('el email que ingresó no es válido'),
    check('nombre').exists().not().isEmpty().isString().isLength({max:75}).withMessage('El nombre no puede tener más de 75 caracteres'),
    check('password').exists().not().isEmpty().isString().isLength({min:6}).withMessage('La contraseña debe tener al menos 6 caracteres'),
    check('telefono').exists().not().isEmpty().isString().isLength({max:45}).withMessage('El telefono no puede tener más de 45 caracteres'),
    check('fechaNacimiento').exists().not().isEmpty().isDate().withMessage('La fecha es invalida'),
    check('idCliente').exists().not().isEmpty().isInt(),
    (req, res, next) => {
        validateResult(req, res, next);
    }

]

const validateCategoriaProductos = [
    check('idUsuario').exists().not().isEmpty().isInt(),
    check('nombre').exists().not().isEmpty().isString().isLength({max:45}).withMessage('El nombre no puede tener más de 45 caracteres'),
    check('idEstado').exists().not().isEmpty().isInt(),
    check('fechaCreacion').exists().not().isEmpty().isDate(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

const validateProducto = [
    check('idCategoria').exists().not().isEmpty().isInt(),
    check('idUsuario').exists().not().isEmpty().isInt(),
    check('nombre').exists().not().isEmpty().isString().isLength({max:45}).withMessage('El nombre no puede tener más de 45 caracteres'),
    check('marca').exists().not().isEmpty().isString().isLength({max:45}).withMessage('La marca no puede tener más de 45 caracteres'),
    check('codigo').exists().not().isEmpty().isString().isLength({max:45}).withMessage('El codigo no puede tener más de 45 caracteres'),
    check('codigo').exists().not().isEmpty().isString().isLength({max:45}).withMessage('El codigo no puede tener más de 45 caracteres'),
    check('stock').exists().not().isEmpty().isFloat(),
    check('idEstado').exists().not().isEmpty().isInt(),
    check('precios').exists().not().isEmpty().isFloat(),
    check('fechaCreacion').exists().not().isEmpty().isISO8601(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

const validateOrdendetalles = [
    check('idOrden').exists().not().isEmpty().isInt(),
    check('idProducto').exists().not().isEmpty().isInt(),
    check('cantidad').exists().not().isEmpty().isFloat(),
    check('precio').exists().not().isEmpty().isFloat(),
    check('subtotal').exists().not().isEmpty().isFloat(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

const validateOrden = [
    check('idUsuario').exists().not().isEmpty().isInt(),
    check('idEstado').exists().not().isEmpty().isInt(),
    check('fecha').exists().not().isEmpty().isDate(),
    check('nombre').exists().not().isEmpty().isString().isLength({ max: 75 }).withMessage('El nombre no puede tener más de 75 caracteres'),
    check('direccion').exists().not().isEmpty().isString().isLength({ max: 545 }).withMessage('La direccion no puede tener más de 545 caracteres'),
    check('telefono').exists().not().isEmpty().isString().isLength({ max: 45 }).withMessage('El telefono no puede tener más de 45 caracteres'),
    check('email').exists().not().isEmpty().isEmail().isLength({ max: 75 }).withMessage('El email no puede tener más de 75 caracteres'),
    check('fechaEntrega').exists().not().isEmpty().isDate(),
    check('total').exists().not().isEmpty().isFloat(),

    check('ordenDetalle')
        .exists().withMessage('ordenDetalle es obligatorio')
        .not().isEmpty().withMessage('ordenDetalle no puede estar vacío')
        .isArray().withMessage('ordenDetalle debe ser un arreglo'),

    check('ordenDetalle.*.idProducto')
        .exists().withMessage('idProducto es obligatorio')
        .isInt().withMessage('idProducto debe ser un número entero'),

    check('ordenDetalle.*.cantidad')
        .exists().withMessage('cantidad es obligatorio')
        .isFloat({ min: 0 }).withMessage('cantidad debe ser un número mayor o igual a 0'),

    check('ordenDetalle.*.precio')
        .exists().withMessage('precio es obligatorio')
        .isFloat({ min: 0 }).withMessage('precio debe ser un número mayor o igual a 0'),

    /*check('ordenDetalle.*.subtotal')
        .exists().withMessage('subtotal es obligatorio')
        .isFloat({ min: 0 }).withMessage('subtotal debe ser un número mayor o igual a 0'),*/

    (req, res, next) => {
        validateResult(req, res, next);
    }
];


module.exports = {
    validateCategoria,
    validateRol,
    validateClientes,
    validateUsuarios,
    validateCategoriaProductos,
    validateProducto,
    validateOrdendetalles,
    validateEstados,
    validateOrden
}