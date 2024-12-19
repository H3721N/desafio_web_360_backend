const {Sequelize, DataTypes, Model} = require('sequelize');

const sequelize = new Sequelize('GDA00411_OT_herlin_gomez', 'root', 'h3721n@fernando.GE', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

class categoriaProducto extends Model {}

categoriaProducto.init({
    idCategoriaProductos: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuarios_idusuarios: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuario',
            key: 'idusuario'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estados_idestados: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Estados',
            key: 'idestados'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false
    },
},{
    sequelize,
    modelName: 'categoriaProducto',
    tableName:'CategoriaProductos',
    timestamps: false
});

module.exports = categoriaProducto;
