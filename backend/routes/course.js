const express = require('express')
const {getAllCourses, getCourseById, addCourse,deleteCourse,updateCourse} = require('../controllers/courseController')

const router = express.Router()

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/', addCourse);
router.delete('/:id', deleteCourse);
router.put('/:id', updateCourse);

module.exports = router;