
const ErrorResponse = require("../utilities/ErrorResponse");
const asyncHandler = require("../middleware/async");


// @desc loge
// @route get /api/v1/review/loge
// @access public

exports.loge = asyncHandler(async (req, res, next) => {

  console.log("sa")

});