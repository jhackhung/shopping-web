const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Role = sequelize.define("Role", {
    id: {
        type: DataTypes.INTEGER,
        // defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

Role.sync()
.then(() => {
    console.log("Role table created successfully");
})
.catch((err) => {
    console.log("Error creating role table:", err);
});

module.exports = Role;