import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './student-components.css';

const StudentList = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get('/students')
            .then(response => setStudents(response.data))
            .catch(error => console.error("Cannot fetch students:", error));
    }, []);

    const handleDeleteStudent = (studentId) => {
        axios.delete(`/students/${studentId}`)
            .then(() => {
                alert("Student deleted successfully!");
                setStudents(prevStudents => prevStudents.filter(student => student.studentId !== studentId));
            })
            .catch(error => console.error("Error deleting student:", error));
    };

    return (
        <div className="student-list-container">
            <h2>Student List</h2>
            <ul>
                {students.map(student => (
                    <li key={student.studentId}>{student.name} - {student.department}
                        <button onClick={() => handleDeleteStudent(student.studentId)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentList;
