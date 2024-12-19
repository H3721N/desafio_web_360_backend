const {Sequelize, DataTypes, Model} = require('sequelize');

const sequelize = new Sequelize('GDA00411_OT_herlin_gomez', 'root', 'h3721n@fernando.GE', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

class producto extends Model {}

producto.init({
   idProductos: {
       type: DataTypes.INTEGER,
       autoIncrement: true,
       primaryKey: true
   },
    CategoriasProductos_idCategoriaProductos: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'CategoriasProductos',
            key: 'idCategoriaProductos'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    usuarios_idusuarios: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'idusuarios'
        },
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
    precios: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    foto: {
        type: DataTypes.BLOB,
        allowNull: false
    },
},{
    sequelize,
    modelName: 'producto',
    tableName: 'Productos',
    timestamps: false
});

module.exports = producto;