const { DataTypes, Model} = require('sequelize');

const sequelize = require('../db/mysql');

class Estado extends Model {}

Estado.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'idestados'
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'nombre'
    }
},{
    sequelize,
    modelName: 'estado',
    tableName: 'Estados',
    timestamps: false,
});

Estado.associate = function(models) {
    Estado.hasMany(models.Usuario, { foreignKey: 'idEstado', as: 'nombre' });
};

Estado.associate = function(models) {
    Estado.hasMany(models.Orden, { foreignKey: 'idOrden', as: 'nombre' });
};

module.exports = Estado;


async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();