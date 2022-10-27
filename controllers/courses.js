const Courses = require("../models/Course");
const ErrorResponse = require("../utilities/ErrorResponse");
const asyncHandler = require("../middleware/async");

// @desc Get Courses
// @route get /api/v1/courses
// @route get /api/v1/bootcamps/:bootcampId/courses
// @access public

exports.getCourses = asyncHandler(async (req, res, next) => {
    let query;

    if (req.params.bootcampId) {
        console.log('sa');
        query = Courses.find({bootcamp: req.params.bootcampId});
    } else {
        console.log('s');
        query = Courses.find();
    }

    const courses = await query;

    res.status(200)
        .send(
            {
                successL: true,
                count: courses.length,
                data: courses
            }
        );
});
