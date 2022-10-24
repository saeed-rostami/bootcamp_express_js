const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utilities/ErrorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utilities/geocoder");


// @desc Get ALl Bootcamps
// @route get /api/v1/bootcamps
// @access public

exports.getBootcamps = asyncHandler(async (req, res, next) => {
    let query;

    //copy req query
    const reqQuery = {...req.query};

    //fields to exclude
    const removeFields = ["select" , "sort"];

    // loop over removeField and delete the params
    removeFields.forEach(param => delete reqQuery[param]);
    console.log(removeFields);

    //create query string
    let queryString = JSON.stringify(reqQuery);

    //create operators
    queryString = queryString.replace(/\b(gt|gte|lt|lte|in|eq|nin)\b/g, match => `$${match}`);



    //Finding resource
    query = Bootcamp.find(JSON.parse(queryString));

    if (req.query.select) {
        const fields = req.query.select.split(",").join(" ");
        query = query.select(fields);
    }

    //Sort
    if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
    }
    else {
        query = query.sort("-createdAt");
    }

    // execute
    const bootcamps = await query;

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        // data: reqQuery,
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
    res.status(200).json({
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
    res.status(200).json({
        success: true,
        msg: "Bootcamp Deleted"
    });
});

// @desc Get Bootcamps whithin radius
// @route get /api/v1/bootcamps/radius/:zipcode/:distance
// @access private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
    const {zipcode, distance} = req.params;

    console.log(zipcode, distance);
    //get lang & lat from geocode
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    //calc radius
    const radius = distance / 3963;

    const bootcamps = await Bootcamp.find({
        location: {$geoWithin: {$centerSphere: [[lng, lat], radius]}}
    });

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    });
});
