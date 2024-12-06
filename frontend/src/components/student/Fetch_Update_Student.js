import React, { useState } from 'react';
import axios from 'axios';
import './student-components.css';

const FetchStudentById = () => {
    const [studentId, setStudentId] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [error, setError] = useState('');
    const [updateData, setUpdateData] = useState({
        name: '',
        department: '',
        semester: ''
    });

    const handleIdChange = (e) => {
        setStudentId(e.target.value);
    };

    const fetchStudent = () => {
        axios.get(`/students/${studentId}`)
            .then(response => {
                setSelectedStudent(response.data);
                setUpdateData({
                    name: response.data.name,
                    department: response.data.department,
                    semester: response.data.semester
                });
                setError('');
            })
            .catch(() => {
                setError('Student not found');
                setSelectedStudent(null);
            });
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdateData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateStudent = () => {
        axios.put(`/students/${studentId}`, updateData)
            .then(response => {
                setSelectedStudent(response.data);
                setError('');
                alert("Student updated successfully!");
            })
            .catch(error => console.error("Failed to update student:", error));
    };

    return (
        <div className='fetchStudent'>
            <h2>Student By ID</h2>
            <input
                type="text"
                value={studentId}
                onChange={handleIdChange}
                placeholder="Enter Student ID"
            />
            <button onClick={fetchStudent}>Fetch Student</button>

            {error && <p>{error}</p>}
            {selectedStudent && (
                <div>
                    <h3>Student Details</h3>
                    <p>ID: {selectedStudent.studentId}</p>
                    <p>Name: {selectedStudent.name}</p>
                    <p>Department: {selectedStudent.department}</p>
                    <p>Semester: {selectedStudent.semester}</p>

                    <h3>Update Student Details</h3>
                    <input
                        type="text"
                        name="name"
                        value={updateData.name}
                        onChange={handleUpdateChange}
                        placeholder="Name"
                    />
                    <input
                        type="text"
                        name="department"
                        value={updateData.department}
                        onChange={handleUpdateChange}
                        placeholder="Department"
                    />
                    <input
                        type="number"
                        name="semester"
                        value={updateData.semester}
                        onChange={handleUpdateChange}
                        placeholder="Semester"
                    />
                    <button onClick={handleUpdateStudent}>Update Student</button>
                </div>
            )}
        </div>
    );
};

export default FetchStudentById;