const {Sequelize, DataTypes, Model} = require('sequelize');

const sequelize = new Sequelize('GDA00411_OT_herlin_gomez', 'root', 'h3721n@fernando.GE', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

class cliente extends Model {}

cliente.init({
    idcliente: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    razon_social: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre_comercial: {
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion_entrega: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
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

module.exports = cliente;