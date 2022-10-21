const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utilities/ErrorResponse");
const asyncHandler = require("../middleware/async");

// @desc Get ALl Bootcamps
// @route get /api/v1/bootcamps
// @access public

exports.getBootcamps = asyncHandler(async (req, res, next) => {
    const bootcamps = await Bootcamp.find();
    // asyncHandler()
    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    });

});

// @desc Get Single Bootcamps
// @route get /api/v1/bootcamps/:id
// @access public

exports.getBootcamp = asyncHandler(async (req, res, next) => {
        const bootcamp = await Bootcamp.findById(req.params.id);
        res.status(200).json({
            success: true,
            data: bootcamp
        });

        if (!bootcamp) {
            return next(new ErrorResponse(`Bootcamp Not Found by Id ${req.params.id}`, 404));
        }
});


// @desc Create New Bootcamps
// @route get /api/v1/bootcamps/
// @access private

exports.createBootcamp = asyncHandler(async (req, res, next) => {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({
            success: true,
            msg: "Bootcamp Created",
            data: bootcamp
        });
});


// @desc Update Bootcamps
// @route get /api/v1/bootcamps/:id
// @access private

exports.updateBootcamp = asyncHandler(async (req, res, next) => {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!bootcamp) {
            return next(new ErrorResponse(`Bootcamp Not Found by Id ${req.params.id}`, 404));
        }
        res.status(201).json({
            success: true,
            msg: "Bootcamp Updated",
            data: bootcamp
        });
});


// @desc Delete Bootcamps
// @route get /api/v1/bootcamp/:id
// @access private

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

        if (!bootcamp) {
            return next(new ErrorResponse(`Bootcamp Not Found by Id ${req.params.id}`, 404));
        }
        res.status(201).json({
            success: true,
            msg: "Bootcamp Deleted"
        });
});
