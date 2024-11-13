import './App.css';
import AddCourse from './components/AddCourse';
import AddStudent from './components/AddStudent';
import StudentList from './components/Studentlist';
import CourseList from './components/CourseList';
import FetchStudentById from './components/Fetch_Update_Student';

function App() {
  return (
    <div className="App">
      <AddCourse/>
      <CourseList/>
      <AddStudent/>
      <StudentList/> 
      <FetchStudentById/>
    </div>
  );
}

export default App;
