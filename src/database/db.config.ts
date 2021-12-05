module.exports = {
  HOST: "localhost",
  USER: "testuser",
  PASSWORD: "12345678",
  DB: "iqbaldb",
  dialect: "mssql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
