const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const Roles = ["user", "admin", "moderator"];

exports.checkDuplicateUsernameOrEmail = catchAsync(async (req, res, next) => {
    const user_name = await User.findOne({
        where: {
            username: req.body.username
        }
    })
    if (user_name) {
        return next(new AppError("Username is already taken!", 400));
    }
    
    const user_email = await User.findOne({
        where: {
            email: req.body.email
        }
    })
    console.log(user_email);
    if(user_email) {
        return next(new AppError("Email is already in use!", 400));
    }
    
    next();
})

exports.checkRolesExisted = catchAsync(async (req, res, next) => {
    console.log(req.body.roles);
    if (req.body.roles) {
        for(let i = 0; i < req.body.roles.length; i++) {
            if (!Roles.includes(req.body.roles[i])) {
                return new AppError(`Failed! Role does not exist!`, 400);
            }
        }
    }

    next();
})