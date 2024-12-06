import React from 'react';
import AddCourse from '../course/AddCourse';
import AddStudent from '../student/AddStudent';
import StudentList from '../student/Studentlist';
import CourseList from '../course/CourseList';
import FetchStudentById from '../student/Fetch_Update_Student';
import FetchCourseById from '../course/Fetch_Update_Course';
import Logout from '../User/Logout';
import './home.css';

const Home = () => {
    return (
        <>
            <div className='logout1'>
                <Logout />
            </div>
            <div className="home">
                <h1>Course Managemnet</h1>
                <div className="container1">
                    <AddCourse />
                    <CourseList />
                    <FetchCourseById />
                </div>
                <h1>Student Managemnet</h1>
                <div className='container2'>
                    <AddStudent />
                    <StudentList />
                    <FetchStudentById />
                </div>
            </div>
        </>
    )
}

export default Home;