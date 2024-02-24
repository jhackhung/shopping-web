const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  rate: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 4.5, // Default value for "rate"
  },
  categories: {
    type: DataTypes.JSON,
    allowNull: true, // Change this according to your requirements
  },
});

Product.sync()
  .then(() => {
    console.log("Product table created successfully");
  })
  .catch((err) => {
    console.log("Error creating product table:", err);
  });

module.exports = Product;
