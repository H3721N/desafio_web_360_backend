const {Sequelize, DataTypes, Model} = require('sequelize');

const sequelize = new Sequelize('GDA00411_OT_herlin_gomez', 'root', 'h3721n@fernando.GE', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

class ordenDetalles extends Model {}

ordenDetalles.init({
    idOrdenDetalles: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Orden_idOrden: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Orden',
            key: 'idOrden'
        },
    },
    Productos_idProductos: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Productos',
            key: 'idProductos'
        },
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