const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const Cart = sequelize.define("cart", {
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

module.exports = Cart;