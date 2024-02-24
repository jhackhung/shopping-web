const Product = require("../models/prodModel");
const catchAsync = require("../utils/catchAsync");

exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      newProduct,
    },
  });
});

exports.getProducts = catchAsync(async (req, res, next) => {
  const products = await Product.findAll();
  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});
