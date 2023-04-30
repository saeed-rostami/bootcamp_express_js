const User = require("models/User");
const ErrorResponse = require("utilities/ErrorResponse");
const asyncHandler = require("middleware/async");


// @desc GET ALL USERS
// @route get /api/v1/auth/users
// @access private/admin

exports.getUsers = asyncHandler(async (req, res, next) => {
    res.status(200)
        .json(res.advancedResults)
});


// @desc GET SINGLE USERS
// @route get /api/v1/auth/users/:id
// @access private/admin

exports.getUser = asyncHandler(async (req, res, next) => {
    const user = User.findById(req.params.id);

    res.status(200)
        .json({
            success: true,
            data: user
        })
});


// @desc CREATE USER
// @route post /api/v1/auth/users/
// @access private/admin

exports.createUser = asyncHandler(async (req, res, next) => {
    const user = User.create(req.body);

    res.status(200)
        .json({
            success: true,
            data: user
        })
});

// @desc UPDATE USER
// @route put /api/v1/auth/users/:id
// @access private/admin

exports.updateUser = asyncHandler(async (req, res, next) => {
    const user = User.findByIdAndUpdate(req.params.id, req.body,


        {
            new: true,
            runValidators: true
        });

    res.status(200)
        .json({
            success: true,
            data: user
        })
});

// @desc DELETE USER
// @route delete /api/v1/auth/users/:id
// @access private/admin

exports.deleteUser = asyncHandler(async (req, res, next) => {
    const user = User.findByIdAndDelete(req.params.id);

    res.status(200)
        .json({
            success: true,
        })
});