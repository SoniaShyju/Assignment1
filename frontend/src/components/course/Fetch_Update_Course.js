import React, { useState } from 'react';
import axios from 'axios';
import './course-components.css';

const FetchCourseById = () => {
    const [courseId, setCourseId] = useState('');
    const [error, setError] = useState('');
    const [courseData, setCourseData] = useState({
        id: '',
        name: '',
        department: '',
        isOpen: false
    });
    const handleIdChange = (e) => {
        setCourseId(e.target.value);
    };

    const fetchCourse = () => {
        axios.get(`/courses/${courseId}`)
            .then(response => {
                setCourseData(response.data);
                setError('');
            })
            .catch(() => {
                setError('Course not found');
            });
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setCourseData(prev => ({
            ...prev,
            [name]: name === "isOpen" ? e.target.checked : value
        }));
    };

    const handleUpdateCourse = () => {
        axios.put(`/courses/${courseId}`, courseData)
            .then(response => {
                alert("Course updated successfully!");
            })
            .catch(error => {
                console.error("Error updating course:", error);
                setError("Failed to update course: " + error.response?.data?.message || error.message);
                console.log(courseId)
            });
    };
    return (
        <div className='fetchStudent'>
            <h2>Course By ID</h2>
            <input
                type="text"
                value={courseId}
                onChange={handleIdChange}
                placeholder="Enter Course ID"
            />
            <button onClick={fetchCourse}>Fetch Course</button>

            {error && <p>{error}</p>}
            {courseData && (
                <div>
                    <h3>Course Details</h3>
                    <p>ID: {courseId}</p>
                    <p>Name: {courseData.name}</p>
                    <p>Department: {courseData.department}</p>
                    <p>Open: {courseData.isOpen ? "Yes" : "No"}</p>

                    <h3>Update Course Details</h3>
                    <input
                        type="text"
                        name="name"
                        value={courseData.name}
                        onChange={handleUpdateChange}
                        placeholder="Name"
                    />
                    <input
                        type="text"
                        name="department"
                        value={courseData.department}
                        onChange={handleUpdateChange}
                        placeholder="Department"
                    />
                    <label>
                        Open:
                        <input
                            type="checkbox"
                            name="isOpen"
                            checked={courseData.isOpen}
                            onChange={handleUpdateChange}
                        />
                    </label>
                    <button onClick={handleUpdateCourse}>Update Student</button>
                </div>
            )}
        </div>
    );
};

export default FetchCourseById;