const express = require('express');
const {protect, authorization} = require('../middleware/auth');


const {getCourses, getCourse, addCourse, updateCourse, deleteCourse} = require("../controllers/courses");

const Course = require("../models/Course");
const advancedResults = require("../middleware/advancedQuery");

const router = express.Router({mergeParams : true});

router.route("/").get(advancedResults(Course, 
 {path: "bootcamp", select: "name description"}),

 getCourses).post(protect, authorization('publisher'),addCourse);


router.route("/:id").get(getCourse)
    .put(protect, authorization('publisher'),updateCourse)
    .delete(protect, authorization('publisher'),deleteCourse);

module.exports = router;