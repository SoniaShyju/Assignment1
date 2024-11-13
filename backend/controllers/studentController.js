const students = require('../data/studentData')

exports.getAllStudents = (req, res) => {
    try {
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ mess: error.mess });
    }
};

exports.getStudentsById = (req, res) => {
    try {
        const studentId = parseInt(req.params.id);
    
        const student = students.find(s => s.id === studentId);

        if (!student) {
            return res.status(404).json({ mess: 'Student not found' });
        }

        res.status(200).json(student)
    } catch (error) {
        res.status(500).json({ mess: error.mess });
    };
};

exports.addStudent = (req, res) => {
    console.log("Received data to add:", req.body);
    try {
        const { id, name, department, semester, enrolledCourses = [], completedCourses = [] } = req.body;
        const newStudent = { id, name, department, semester, enrolledCourses, completedCourses }

        students.push(newStudent);
        res.status(201).json(newStudent);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ mess: error.mess });
    };
};


exports.deleteStudent = (req, res) => {
    try {
        const studentId = parseInt(req.params.id);
        const studentIndex = students.findIndex(s => s.id === studentId);

        if (studentIndex === -1) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const deletedStudent = students.splice(studentIndex, 1);
        res.status(200).json(deletedStudent[0]);
    } catch (error) {
        res.status(500).json({ mess: error.mess });
    }
}

exports.updateStudent = (req, res) => {
    try {
        const studentId = parseInt(req.params.id);
        const studentIndex = students.findIndex(s => s.id === studentId);

        if (studentIndex === -1) {
            return res.status(404).json({ mess: 'Student not found' });
        }

        const updatedStudent = { ...students[studentIndex], ...req.body };
        students[studentIndex] = updatedStudent;
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({ mess: error.mess })
    }
};

