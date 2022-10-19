const Bootcamp = require("../models/Bootcamp");
// @desc Get ALl Bootcamps
// @route get /api/v1/bootcamps
// @access public

exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find();
        res.status(200).json({
            success: true,
            data: bootcamps
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message
        });

    }
};

// @desc Get Single Bootcamps
// @route get /api/v1/bootcamps/:id
// @access public

exports.getBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);
        res.status(200).json({
            success: true,
            data: bootcamp
        });

        if (!bootcamp) {
            res.status(400).json({
                success: false,
                msg: "bootcamp not found"
            });

        }

    } catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message
        });

    }
};


// @desc Create New Bootcamps
// @route get /api/v1/bootcamps/
// @access private

exports.createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({
            success: true,
            msg: "Bootcamp Created",
            data: bootcamp
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};


// @desc Update Bootcamps
// @route get /api/v1/bootcamps/:id
// @access private

exports.updateBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!bootcamp) {
            res.status(400).json({
                success: false,
                msg: "bootcamp not found"
            });

        }
        res.status(201).json({
            success: true,
            msg: "Bootcamp Updated",
            data: bootcamp
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};


// @desc Delete Bootcamps
// @route get /api/v1/bootcamps/:id
// @access private

exports.deleteBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

        if (!bootcamp) {
            res.status(400).json({
                success: false,
                msg: "bootcamp not found"
            });

        }
        res.status(201).json({
            success: true,
            msg: "Bootcamp Deleted"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};
