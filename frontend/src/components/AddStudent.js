import axios from 'axios';
import React, { useState } from 'react';

const AddStudent = () => {
    const [studentData, setStudentData] = useState({
        id: '',
        name: '',
        department: '',
        semester: '',
        enrolledCourses: [],
        completedCourses: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddStudent = () => {
      console.log("Adding student:", studentData); 
        axios.post('/students', studentData)
            .then(response => {
                alert("Student added successfully!");
                console.log("Added student:", response.data);
                
            })
            
            .catch(error => {
                console.error("Error adding student:", error);
            });
    };

    return (
        <div>
            <h2>Add Student</h2>
            <input type="text" name="id" onChange={handleChange} placeholder="ID" required />
            <input type="text" name="name" onChange={handleChange} placeholder="Name" required/>
            <input type="text" name="department" onChange={handleChange} placeholder="Department" required />
            <input type="number" name="semester" onChange={handleChange} placeholder="Semester" required/>
            <button onClick={handleAddStudent}>Add Student</button>
        </div>
    );
};

export default AddStudent;
