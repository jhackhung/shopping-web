const express = require("express");
const checkoutController = require("../controllers/checkoutController");
const router = express.Router();

router.route('/').post(checkoutController.createCheckout).get(checkoutController.getCheckouts);

module.exports = router;