const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require("./app");

const db = require("./models/index");

(async () => {
  try {
    // await db.sync({ force: true });
    await db.sync();
    console.log("Database synced successfully");
  } catch (err) {
    console.log("Error syncing database:", err);
  }
})();

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
