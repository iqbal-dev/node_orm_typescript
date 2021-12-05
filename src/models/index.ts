const dbConfig = require("../database/db.config.ts");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  dialectOptions: {
    instanceName: "instance",
    options: {
      encrypt: true,
      trustServerCertificate: true,
      requestTimeout: 30000,
    },
  },
});

const database: any = {};

database.Sequelize = Sequelize;
database.sequelize = sequelize;

database.tutorials = require("./tutorial.model.ts")(sequelize, Sequelize);

module.exports = database;
