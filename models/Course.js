const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Title is required"]
    },

    description: {
        type: String,
        required: [true, "Description is required"]
    },

    weeks: {
        type: String,
        required: [true, "Weeks is required"]
    },

    tuition: {
        type: String,
        required: [Number, "Tuition is required"]
    },

    minimumSkill: {
        type: String,
        required: [Number, "minimumSkill is required"],
        enum: ["beginner", "intermediate", "advanced"],
    },

    scholarShip: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: "Bootcamp",
        required: true
    }
});

module.exports = mongoose.model("Course", CourseSchema);