const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/mysql');

class Producto extends Model {}

Producto.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'idProductos'
    },
    idCategoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'CategoriasProductos',
            key: 'idCategoriaProductos'
        },
        field: 'CategoriasProductos_idCategoriaProductos',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'idusuarios'
        },
        field: 'usuarios_idusuarios',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stock: {
        type: DataTypes.FLOAT,
        allowNull: false
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
    precios: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    fechaCreacion: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'fecha_creacion'
    },
    foto: {
        type: DataTypes.BLOB,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Producto',
    tableName: 'Productos',
    timestamps: false
});

Producto.associate = function(models) {
    Producto.hasMany(models.OrdenDetalle, { foreignKey: 'idProducto', as: 'ordenDetalles' });
};



module.exports = Producto;