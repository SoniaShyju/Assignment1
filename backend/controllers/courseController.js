const courses = require('../data/courseData')

exports.getAllCourses = (req, res) => {
    try {
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ mess: error.mess });
    }
};

exports.getCourseById = (req, res) => {
    try {
        const courseId = parseInt(req.params.id);
    
        const course = courses.find(s => s.id === courseId);

        if (!course) {
            return res.status(404).json({ mess: 'Course not found' });
        }

        res.status(200).json(course)
    } catch (error) {
        res.status(500).json({ mess: error.mess });
    };
};

exports.addCourse = (req, res) => {
    try {
        const { id, name, department, isOpen } = req.body;
        const newCourse = { id, name, department, isOpen }

        courses.push(newCourse);
        res.status(201).json(newCourse);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ mess: error.mess });
    };
};


exports.deleteCourse = (req, res) => {
    try {
        const courseId = parseInt(req.params.id);
        const courseIndex = courses.findIndex(s => s.id === courseId);

        if (courseIndex === -1) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const deletedCourse = courses.splice(courseIndex, 1);
        res.status(200).json(deletedCourse[0]);
    } catch (error) {
        res.status(500).json({ mess: error.mess });
    }
}

exports.updateCourse = (req, res) => {
    try {
        const courseId = parseInt(req.params.id);
        const courseIndex = courses.findIndex(s => s.id === courseId);

        if (courseIndex === -1) {
            return res.status(404).json({ mess: 'Course not found' });
        }

        const updatedCourse = { ...courses[courseIndex], ...req.body };
        students[courseIndex] = updatedStudent;
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ mess: error.mess })
    }
};

