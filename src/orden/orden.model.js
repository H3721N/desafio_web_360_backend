const {Model, Sequelize, DataTypes} = require('sequelize');

const sequelize = require('../db/mysql');

const OrdenDetalle = require('../ordenDetalles/ordenDetalle.model');


class Orden extends Model{

}

Orden.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'idOrden'
    },
    idUsuario:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuarios',
            key: 'idUsuarios'
        },
        field: 'Usuarios_idUsuarios'
    },
    idEstado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Estados',
            key: 'idEstados'
        },
        field: 'Estados_idEstados'
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'fecha_creacion'
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'nombre_completo'
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'direccion'
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'telefono'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'correo_electronico'
    },
    fechaEntrega: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'fecha_entrega'
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: 'total_orden'
    }

}, {
    sequelize,
    modelName: 'Orden',
    tableName: 'Orden',
    timestamps: false
})


Orden.hasMany(OrdenDetalle, { as: 'ordenDetalles', foreignKey: 'idOrden' });
OrdenDetalle.belongsTo(Orden, { foreignKey: 'idOrden' });


module.exports = Orden;