// const User = require("../models/User");
const ErrorResponse = require("../utilities/ErrorResponse");
const asyncHandler = require("../middleware/async");


// @desc Register
// @route post /api/v1/auth/register
// @access public

exports.register = asyncHandler(async (req, res, next) => {

 res.status.json({success : false})

});