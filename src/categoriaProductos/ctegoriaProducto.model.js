const {Sequelize, DataTypes, Model} = require('sequelize');

const sequelize = require('../db/mysql');

class CategoriaProducto extends Model {}

CategoriaProducto.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'idCategoriaProductos'
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuario',
            key: 'usuarios_idusuarios'
        },
        field: 'Usuarios_idUsuarios',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'nombre'
    },
    idEstado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Estados',
            key: 'idestados'
        },
        field: 'Estados_idEstados',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    fechaCreacion: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'fecha_creacion',
    },
},{
    sequelize,
    modelName: 'categoriaProducto',
    tableName:'CategoriaProductos',
    timestamps: false
});

CategoriaProducto.associate = function(models) {
    CategoriaProducto.hasMany(models.Producto, { foreignKey: 'idCategoria', as: 'Producto' });
};

module.exports = CategoriaProducto;
