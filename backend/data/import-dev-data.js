const fs = require("fs");
const sequelize = require("../models/index");
const Product = require("../models/prodModel");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database synced successfully");
  } catch (err) {
    console.log("Error syncing database:", err);
  }
})();

const products = JSON.parse(
    fs.readFileSync(`${__dirname}/products.json`, "utf-8")
)

const importData = async() => {
    try {
        await Product.bulkCreate(products);
        console.log("Data successfully imported");
    } catch(err) {
        console.log(err);
    }
    process.exit();
}

const deleteData = async() => {
    try {
        await Product.destroy({where: {}});
        console.log("Data successfully deleted");
    } catch(err) {
        console.log(err);
    }
    process.exit();
}

if(process.argv[2] === "--import") {
    importData();
} else if(process.argv[2] === "--delete") {
    deleteData();
}