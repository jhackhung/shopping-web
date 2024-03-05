const express = require("express");
const prodController = require("../controllers/prodController");
const router = express.Router();

router
  .route("/")
  .get(prodController.getProducts)
  .post(prodController.createProduct);
router.route("/:id").get();

module.exports = router;
