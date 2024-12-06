const Course = require('../models/Course')

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const courseId = req.params.id;

        const course =  await Course.findOne({id: courseId});

        if (!course) {
            return res.status(404).json({ mess: 'Course not found' });
        }

        res.status(200).json(course)
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.addCourse = async (req, res) => {
    try {
        const { id, name, department, isOpen } = req.body;

        if (!id || !name || !department) {
            return res.status(404).json({ success: false, message: "All fields are required" });
        }

        const newCourse = new Course({ id, name, department, isOpen });

        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: error.message });
    };
};


exports.deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.id;

        const deletedCourse = await Course.findOneAndDelete({id: courseId});

        if (!deletedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({message: 'Course deleted successfully', deletedCourse});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const updatedData = req.body;

        const updatedCourse = await Course.findOneAndUpdate({id: courseId}, updatedData, {new : true});

        if (!updatedCourse) {
            return res.status(404).json({ mess: 'Course not found' });
        }

        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

