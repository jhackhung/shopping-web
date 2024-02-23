const dotenv = require("dotenv");
const mysql = require("mysql");

dotenv.config({ path: "./config.env" });

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require("./app");

const con = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
})


const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
