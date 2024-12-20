const {Sequelize, DataTypes, Model} = require('sequelize');

const sequelize = require('../db/mysql');

class Cliente extends Model {}

Cliente.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'idcliente'
    },
    razonSocial: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'razon_social'
    },
    nombreComercial: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'nombre_comercial'
    },
    direccionEntrega: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'direccion_entrega'
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'telefono'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'email'
    },
},{
    sequelize,
    modelName: 'cliente',
    tableName: 'Clientes',
    timestamps: false,
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();

module.exports = Cliente;