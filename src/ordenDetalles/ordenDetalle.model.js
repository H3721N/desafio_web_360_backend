const {Sequelize, DataTypes, Model} = require('sequelize');

const sequelize = require('../db/mysql');

class ordenDetalles extends Model {}

ordenDetalles.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'idOrdenDetalles'
    },
    idOrden: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Orden',
            key: 'idOrden'
        },
        field: 'Orden_idOrden'
    },
    idProducto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Productos',
            key: 'idProductos'
        },
        field: 'Productos_idProductos'
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    subtotal: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'ordenDetalles',
    tableName: 'OrdenDetalles',
    timestamps: false
});

module.exports = ordenDetalles;