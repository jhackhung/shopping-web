const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.sync()
  .then(() => {
    console.log("User table created successfully");
  })
  .catch((err) => {
    console.log("Error creating user table:", err);
  });

module.exports = User;
