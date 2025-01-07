const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/mysql');
const Producto = require('../producto/producto.model');

class OrdenDetalle extends Model {}

OrdenDetalle.init({
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
    modelName: 'OrdenDetalle',
    tableName: 'OrdenDetalles',
    timestamps: false
});

OrdenDetalle.belongsTo(Producto, { foreignKey: 'idProducto', as: 'Producto' });

module.exports = OrdenDetalle;