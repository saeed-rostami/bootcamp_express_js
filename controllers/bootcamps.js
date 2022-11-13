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
    const removeFields = ["select", "sort", "page", "limit"];

    // loop over removeField and delete the params
    removeFields.forEach(param => delete reqQuery[param]);


    //create query string
    let queryString = JSON.stringify(reqQuery);

    //create operators
    queryString = queryString.replace(/\b(gt|gte|lt|lte|in|eq|nin)\b/g, match => `$${match}`);


    //Finding resource
    query = Bootcamp.find(JSON.parse(queryString)).populate("courses");

    if (req.query.select) {
        const fields = req.query.select.split(",").join(" ");
        query = query.select(fields);
    }

    //Sort
    if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
    } else {
        query = query.sort("-createdAt");
    }

    //Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Bootcamp.countDocuments();

    query = query.skip(startIndex).limit(limit);


        // execute
        const bootcamps = await query;

    //Pagination result
    pagination = {};

    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        };
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        };
    }


    res.status(200).json({
        success: true,
        pagination: pagination,
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
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp Not Found by Id ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        msg: "Bootcamp Deleted"
    });

    bootcamp.remove();
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
