const express = require('express');

const {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius
} = require("../controllers/bootcamps");

//include other routes
const courseRoute = require("./courses");

const router = express.Router();

//resource other route
router.use("/:bootcampId/courses" , courseRoute);


router.route("/radius/:zipcode/:distance")
    .get(getBootcampsInRadius);

router.route("/")
    .get(getBootcamps)
    .post(createBootcamp);


router.route("/:id")
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);


module.exports = router;