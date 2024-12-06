const  Student = require('../models/student');

exports.getAllStudents = async (req, res) => {
    try {

    const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getStudentsById = async(req, res) => {
    try {
        const {id} = req.params;
        console.log(`Received ID: ${id}`);
        const student = await Student.findOne({studentId: id});

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(student)
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.addStudent = async (req, res) => {
    console.log("Received data to add:", req.body);
    try {
        const { studentId, name, department, semester, enrolledCourses = [], completedCourses = [] } = req.body;

        if (!studentId || !name || !department || !semester) {
            return res.status(404).json({success: false, message: "All fields are required"});
        }

        const newStudent = new Student({ studentId, name, department, semester, enrolledCourses, completedCourses });

        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: error.message });
    };
};


exports.deleteStudent = async (req, res) => {
    try {
        const {id} = req.params;
        
        const deletedStudent = await Student.findOneAndDelete({studentId: id});

        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(deletedStudent)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateStudent = async (req, res) => {
    try {
        const {id} = req.params;
        const updatedData = req.body;

        const student = await Student.findOneAndUpdate({studentId: id}, updatedData, {new: true});

        if (!student) {
            return res.status(404).json({ mess: 'Student not found' });
        }

        res.status(200).json(student)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

