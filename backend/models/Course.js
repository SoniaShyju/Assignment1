const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    isOpen: {
        type: Boolean,
        required: true,
    },

});

const Course = mongoose.model("Course", CourseSchema)

module.exports = Course;