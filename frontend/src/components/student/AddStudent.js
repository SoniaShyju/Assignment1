import axios from 'axios';
import React, { useState } from 'react';
import './student-components.css';

const AddStudent = () => {
    const [studentData, setStudentData] = useState({
        studentId: '',
        name: '',
        department: '',
        semester: '',
        enrolledCourses: '',
        completedCourses: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddStudent = async () => {
        const enrolledCoursesArray = studentData.enrolledCourses.split(',').map(course => course.trim());
        const completedCoursesArray = studentData.completedCourses.split(',').map(course => course.trim());

        const dataToSend = {
            studentId: studentData.studentId,
            name: studentData.name,
            department: studentData.department,
            semester: studentData.semester,
            enrolledCourses: enrolledCoursesArray,
            completedCourses: completedCoursesArray
        };
        try {
            const response = await axios.post('/students', dataToSend)
            alert("Student added successfully!");
            console.log("Added student:", response.data);
        } catch (error) {
            console.error("Error adding student:", error.response.data || error.message);
            alert("Failed to add Student!");
        };
    };

    return (
        <div className='addStudent'>
            <h2>Add Student</h2>
            <input type="text" name="studentId" onChange={handleChange} placeholder="ID" required />
            <input type="text" name="name" onChange={handleChange} placeholder="Name" required />
            <input type="text" name="department" onChange={handleChange} placeholder="Department" required />
            <input type="number" name="semester" onChange={handleChange} placeholder="Semester" required />
            <input type="text" name="enrolled Courses" onChange={handleChange} placeholder="Enrolled Courses" required />
            <input type="text" name="completed courses" onChange={handleChange} placeholder="Completed courses" required />
            <button onClick={handleAddStudent}>Add Student</button>
        </div>
    );
};

export default AddStudent;
