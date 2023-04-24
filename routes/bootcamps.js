const express = require('express');
const {protect, authorization} = require('../middleware/auth');

const {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius,
    uploadBootcampPhoto
} = require("../controllers/bootcamps");

const Bootcamp = require("../models/Bootcamp");
const advancedResults = require("../middleware/advancedQuery");

//include other routes
const courseRoute = require("./courses");

const router = express.Router();

//resource other route
router.use("/:bootcampId/courses", courseRoute);


router.route("/radius/:zipcode/:distance")
    .get(getBootcampsInRadius);

router.route("/")
    .get(
        advancedResults(Bootcamp, "courses"), getBootcamps)
    .post(protect, authorization('publisher' ,'admin'), createBootcamp);


router.route("/:id")
    .get(getBootcamp)
    .put(protect, authorization('publisher' ,'admin'), updateBootcamp)
    .delete(protect, authorization('publisher' ,'admin'), deleteBootcamp);


router.route("/:id/upload-photo").put(protect, authorization('publisher' ,'admin'), uploadBootcampPhoto);


module.exports = router;