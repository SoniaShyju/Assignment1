import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './course-components.css';

const CourseList = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = () => {
        axios.get('/courses')
            .then(response => setCourses(response.data))
            .catch(error => console.error("Cannot fetch Courses", error))
    }
    const handleDeleteCourse = (id) => {
        axios.delete(`/courses/${id}`)
            .then(() => {
                alert("Course deleted successfully!");
                fetchCourses();
            })
            .catch(error => console.error("Error deleting course:", error));
    };
    return (
        < div className='courseList'>
            <h2> Course List</h2>
            <ul>
                {courses.map(course => (
                    <li key={course.id}>{course.name} - {course.department} (Open: {course.isOpen ? "Yes" : "No"})
                        <button onClick={() => handleDeleteCourse(course.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseList;