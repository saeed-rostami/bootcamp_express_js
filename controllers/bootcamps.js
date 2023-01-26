const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utilities/ErrorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utilities/geocoder");
const path = require('path');


// @desc Get ALl Bootcamps
// @route get /api/v1/bootcamps
// @access public

exports.getBootcamps = asyncHandler(async (req, res, next) => {


    res.status(200).json(res.advancedResults);

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

// @desc Upload Photo Bootcamps
// @route put /api/v1/bootcamp/:id
// @access private

exports.uploadBootcampPhoto = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp Not Found by Id ${req.params.id}`, 404));
    }

    if (!req.files) {
        return next(new ErrorResponse(`Please Upload a File`, 422));
    
    }

    const photo = req.files.file;


    // image validation
    if (!photo.mimetype.startsWith("image")) {
        return next(new ErrorResponse(`Please Upload a Valid Image`, 422));
    
    }

    if (photo.size > process.env.MAX_FILE_UPLOAD) {
        return next(new ErrorResponse(`File is too large`, 422));
    }


    photo.name = `photo_${bootcamp.id}${path.parse(photo.name).ext}`;


    
    photo.mv(`${process.env.FILE_UPLOADS_PATH}/${photo.name}` , async err => {
        if (err) {
            console.log(err);
        return next(new ErrorResponse(`Problem with file upload`, 422));

        };


        await Bootcamp.findByIdAndUpdate(req.params.id , {photo : photo.name});

        res.status(200).json({
            success: true,
            data: photo.name
        });
    })
});
