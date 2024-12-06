const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    studentId: {
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
    semester: {
        type: String,
        required: true,
    },
    enrolledCourses: {
        type: [String],
        default: []
    },
    completedCourses: {
        type: [String],
        default: []
    },
});

const Student = mongoose.model("Student", StudentSchema, 'student')

module.exports = Student;