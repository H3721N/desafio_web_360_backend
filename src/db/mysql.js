import { Sequelize } from '@sequelize/core';
import { MsSqlDialect } from '@sequelize/mssql';

const sequelize = new Sequelize({
    dialect: MsSqlDialect,
    server: 'localhost',
    port: 3306,
    database: 'GDA00411_OT_herlin_gomez',
    authentication: {
        type: 'default',
        options: {
            userName: 'username',
            password: 'h3721n@fernando.GE',
        },
    },
});