const express = require("express");
const authJwt = require("../middleware/authJwt");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/all", userController.allAccess);

router.get("/user", [authJwt.verifyToken], userController.userBoard);

router.get(
  "/mod",
  [authJwt.verifyToken, authJwt.isModerator],
  userController.moderatorBoard
);

router.get(
  "/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  userController.adminBoard
);

module.exports = router;
