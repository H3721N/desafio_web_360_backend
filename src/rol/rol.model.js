const {Sequelize, DataTypes, Model} = require('sequelize');

const sequelize = require('../db/mysql');


class Rol extends Model {}

Rol.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'idrol'
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'nombre'
    }
},{
    sequelize,
    modelName: 'rol',
    tableName: 'Rol',
    timestamps: false,
});

Rol.associate = function(models) {
    Rol.hasMany(models.Usuario, { foreignKey: 'idRol', as: 'nombre' });
};

module.exports = Rol;

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();