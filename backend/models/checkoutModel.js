const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Checkout = sequelize.define("Checkout", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  products: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shipping_address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "pending",
  },
});

Checkout.sync()
  .then(() => {
    console.log("Checkout table created successfully");
  })
  .catch((err) => {
    console.log("Error creating checkout table:", err);
  });


module.exports = Checkout;