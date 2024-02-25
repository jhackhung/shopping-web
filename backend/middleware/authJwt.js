const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.verifyToken = catchAsync(async (req, res, next) => {
    let token = req.headers["x-access-token"];

    if(!token) {
        return next(new AppError("No token provided!", 403));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(new AppError("Unauthorized!", 401));
        }
        req.id = decoded.id;
        next();
    })
});

exports.isAdmin = catchAsync(async (req, res, next) => {
    const user = await User.findByPk(req.id);
    const roles = await user.getRoles();
    for(let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
            next();
            return;
        }
    }

    return next(new AppError("Require Admin Role!", 403));
})

exports.isModerator = catchAsync(async (req, res, next) => {
    const user = await User.findByPk(req.id);
    const roles = await user.getRoles();
    for(let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'moderator') {
            next();
            return;
        }
    }

    return next(new AppError("Require Moderator Role!", 403));
});

exports.isModeratorOrAdmin = catchAsync(async (req, res, next) => {
    const user = await User.findByPk(req.id);
    const roles = await user.getRoles();
    for(let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'moderator' || roles[i].name === 'admin') {
            next();
            return;
        }
    }

    return next(new AppError("Require Moderator or Admin Role!", 403));
});
