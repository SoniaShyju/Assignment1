import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentList = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get('/students')
            .then(response => setStudents(response.data))
            .catch(error => console.error("Cannot fetch students:", error));
    }, []);

    return (
        <div className="student-list-container">
            <h2>Student List</h2>
            <ul>
                {students.map(student => (
                    <li key={student.id}>{student.name} - {student.department}</li>
                ))}
            </ul>

            <style>{`
                ul li {
                    padding: 10px;
                    margin-bottom: 10px;
                    background-color: #fff;
                    border-radius: 5px;
                    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 16px;
                    color: #555;
                }
            `}</style>
        </div>
    );
};

export default StudentList;
