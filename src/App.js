import { useState } from 'react';
import './App.scss';
import Header from "./components/shared/header/Header"
import StudentForm from "./components/app/student/student-form/StudentForm"
import StudentList from './components/app/student/student-list/StudentList';
import StudentCard from './components/app/student/student-card/StudentCard';

function App() {
   // object state
   const [student, setStudent] = useState({ studentName: "", course: "", instructor: "", score: "" });
   const [isStudentValid, setIsStudentValid] = useState({ studentName: true, course: true, instructor: true, score: true });
 
   // const [studentList, setStudentList] = useState([]);
 
   const [studentList, setStudentList] = useState([
     { studentName: "Ege Ozaslan", course: "React", instructor: "Orkun Durmaz", score: "100" },
     { studentName: "Hicran Ertugral", course: "Frontend Dev", instructor: "Orkun Durmaz", score: "Lorem" },
     { studentName: "Senay Senturk", course: "Frontend Dev", instructor: "Orkun Durmaz", score: "Lorem" },
     { studentName: "Mais Baath", course: ".Net", instructor: "Kartal Kaan Akdogan", score: "100" },
   ]);
 
   const addStudent = (event) => {
     event.preventDefault();
     setIsStudentValid({ ...student });
     if (Object.values(student).every(value => value)) {
       setStudentList(prevStudentList => [...prevStudentList, student]);
       setStudent({ studentName: "", course: "", instructor: "", score: "" });
     }
   }
 
   const handleStudentInputProp = (studentProp) => setStudent((prevStudent) => ({ ...prevStudent, ...studentProp }));

  return (
    <div className="app">
    <Header title={"Student Manager"} />

    <StudentForm student={student} handleStudentInputProp={handleStudentInputProp} isStudentValid={isStudentValid} addStudent={addStudent} />

    <StudentList studentList={studentList} />
  </div>
  );
}

export default App;
