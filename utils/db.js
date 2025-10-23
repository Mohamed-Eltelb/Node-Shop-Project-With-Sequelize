const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-sequelize", "root", "12345678", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;