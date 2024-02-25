const express = require("express");

const { signup, login } = require("../controllers/authController");
const verifySignUp = require("../middleware/verifySignUp");

const router = express.Router();

router
  .route("/signup")
  .post(
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    signup
  );

router.route("/login").post(login);

module.exports = router;
