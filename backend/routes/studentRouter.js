const express = require('express')
const {getAllStudents, getStudentsById,addStudent,deleteStudent, updateStudent} = require('../controllers/studentController')

const router = express.Router()

router.get('/', getAllStudents);
router.get('/:id', getStudentsById);
router.post('/', addStudent);
router.delete('/:id', deleteStudent);
router.put('/:id', updateStudent);

module.exports = router;