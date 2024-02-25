const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const prodRouter = require("./routes/prodRoutes");
const authRouter = require("./routes/authRoutes");
const checkoutRouter = require("./routes/checkoutRoutes");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.TRUSTED_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Authorization");
  next();
});

app.use("/api/v1/prods", prodRouter);
app.use("/api/v1/test", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/checkout", checkoutRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
})

app.use(globalErrorHandler);

module.exports = app;
