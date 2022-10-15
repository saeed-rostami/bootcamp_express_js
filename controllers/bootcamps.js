// @desc Get ALl Bootcamps
// @route get /api/v1/bootcamps
// @access public

exports.getBootcamps = (req, res, next) => {
    res.status(200).json({success: true, msg: "all bootcamps"});
};

// @desc Get Single Bootcamps
// @route get /api/v1/bootcamps/:id
// @access public

exports.getBootcamp = (req, res, next) => {
    res.status(200).json({success: true, msg: "single bootcamp"});
};


// @desc Create New Bootcamps
// @route get /api/v1/bootcamps/
// @access private

exports.createBootcamp = (req, res, next) => {
    res.status(201).json({success: true, msg: "create bootcamp"});
};


// @desc Update Bootcamps
// @route get /api/v1/bootcamps/:id
// @access private

exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({success: true, msg: "update bootcamp"});
};


// @desc Delete Bootcamps
// @route get /api/v1/bootcamps/:id
// @access private

exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({success: true, msg: "delete bootcamp"});
};

