const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require("./app");

const db = require("./models/index");
const User = require("./models/userModel");
const Role = require("./models/roleModel");

User.belongsToMany(Role, {
  through: "user_roles",
});

Role.belongsToMany(User, {
  through: "user_roles",
});

(async () => {
  try {
    // await db.sync({ force: true });
    await db.sync();
    console.log("Database synced successfully");
    // initial();
  } catch (err) {
    console.log("Error syncing database:", err);
  }
})();

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}

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
