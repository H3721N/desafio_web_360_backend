const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = require('../db/mysql');

class Usuario extends Model {}

Usuario.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'idusuarios'
    },
    idRol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Rol',
            key: 'idrol'
        },
        field: 'rol_idrol',
    },
    idEstado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Estados',
            key: 'idestados'
        },
        field: 'estados_idestados',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'correo_electronico'
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'nombre_completo'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password'
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
        password: 'telefono'
    },
    fechaNacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'fecha_nacimiento'
    },
    creacionCuenta: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        field: 'fecha_creacion'
    },
    idCliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Clientes',
            key: 'idcliente'
        },
        field: 'Clientes_idClientes',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }


},{
    sequelize,
    modelName: 'usuario',
    tableName: 'Usuarios',
    timestamps: false,
});

module.exports = Usuario;