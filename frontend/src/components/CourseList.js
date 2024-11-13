import React, {useEffect, useState} from 'react';
import axios from 'axios';

const CourseList = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get('/courses')
        .then(response => setCourses(response.data))
        .catch(error => console.error("Cannot fetch Courses", error))
    }, []);

    return (
        <div>
            <h2> Course List</h2>
            <ul>
                {courses.map(course => (
                    <li key={course.id}>{course.name} - {course.department} (Open: {course.isOpen ? "Yes" : "No"})</li>
                ))}
            </ul>
        </div>
    );
};

export default CourseList;