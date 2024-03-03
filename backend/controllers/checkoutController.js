const Checkout = require("../models/checkoutModel");
const catchAsync = require("../utils/catchAsync");

const AppError = require("../utils/appError");

exports.createCheckout = catchAsync(async (req, res, next) => {
  try {
    const checkout = await Checkout.create({
      user: req.body.user,
      products: req.body.products,
      total: req.body.total,
      shipping_address: req.body.shipping_address,
      payment_method: req.body.payment_method,
      status: req.body.status,
    });
    await checkout.save();

    res.status(201).json({
      status: "success",
      data: {
        checkout,
      },
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
});

exports.getCheckouts = catchAsync(async (req, res, next) => {
  try {
    const checkouts = await Checkout.findAll();
    res.status(200).json({
      status: "success",
      results: checkouts.length,
      data: {
        checkouts,
      },
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
});
