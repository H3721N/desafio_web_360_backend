const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('GDA00411_OT_herlin_gomez', 'root', 'h3721n@fernando.GE', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
})

class usuario extends Model {}

usuario.init({
    idusuarios: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    rol_idrol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Rol',
            key: 'idrol'
        },
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
    correo_electronico: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre_completo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    Clientes_idClientes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Clientes',
            key: 'idcliente'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }


},{
    sequelize,
    modelName: 'usuario',
    tableName: 'Usuarios',
    timestamps: false,
});

module.exports = usuario;