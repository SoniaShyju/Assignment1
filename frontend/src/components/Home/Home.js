import React from 'react';
import AddCourse from '../course/AddCourse';
import AddStudent from '../student/AddStudent';
import StudentList from '../student/Studentlist';
import CourseList from '../course/CourseList';
import FetchStudentById from '../student/Fetch_Update_Student';
import FetchCourseById from '../course/Fetch_Update_Course';

const Home = () => {
    return (
        <div className="home">
            <div className="container1">
                <div>
                    <AddCourse />
                    <CourseList />
                    <FetchCourseById />
                </div>
            </div>

            <div className='container2'>
                <div>
                    <AddStudent />
                    <FetchStudentById />
                    <StudentList />
                </div>
            </div>
        </div>
    )
}

export default Home;