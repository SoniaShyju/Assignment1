class Student {
    constructor(id, name, department, semester, enrolledCourses = [], completedCourse = []) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.semester = semester;
        this.enrolledCourses = enrolledCourses;
        this.completedCourse = completedCourse;
    }
}

module.exports = Student;