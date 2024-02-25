const Sequelize = require("sequelize");
const path = require("path");

const User = require("../models/userModel");
const Role = require("../models/roleModel");
const catchAsync = require("../utils/catchAsync");
require('dotenv').config({ path: path.resolve(__dirname, '../config.env') });

const Op = Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/appError");

exports.signup = catchAsync(async (req, res, next) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });
      await user.setRoles(roles);
      res.status(200).json({
        status: "success",
        message: "User was registered successfully!",
      });
    } else {
      await user.setRoles([1]);
      res.status(200).json({
        status: "success",
        message: "User was registered successfully!",
      });
    }
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
});

exports.login = catchAsync(async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User Not Found!",
      });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).json({
        status: "fail",
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400,
      } // 24 hours
    );

    const authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }
    res.status(200).json({
      status: "success",
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
});
