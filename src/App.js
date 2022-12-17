import { useState } from 'react';
import axios from 'axios';
import { useEffect } from "react";

import './App.scss';

// components
import Header from "./components/shared/header/Header"
import StudentForm from "./components/app/student/student-form/StudentForm"
import StudentList from './components/app/student/student-list/StudentList';
import StudentCard from './components/app/student/student-card/StudentCard';
import { API_URL } from './enum';

function App() {
    // object state
    const [student, setStudent] = useState({ studentName: "", course: "", instructor: "", score: "" });
    const [isStudentValid, setIsStudentValid] = useState({ studentName: true, course: true, instructor: true, score: true });
    /**
     * @type {[Student[], React.Dispatch<React.SetStateAction<Student[]>>]}
     */
    const [studentList, setStudentList] = useState([]);



    const [isStudentLoading, setIsStudentLoading] = useState(false);
    const [isStudentListLoading, setIsStudentListLoading] = useState(false);

    const [currentStudent, setCurrentStudent] = useState({});

    /* 
    const [studentList, setStudentList] = useState([
      { studentName: "Ege Ozaslan", course: "React", instructor: "Orkun Durmaz", score: "100" },
      { studentName: "Hicran Ertugral", course: "Frontend Dev", instructor: "Orkun Durmaz", score: "Lorem" },
      { studentName: "Senay Senturk", course: "Frontend Dev", instructor: "Orkun Durmaz", score: "Lorem" },
      { studentName: "Mais Baath", course: ".Net", instructor: "Kartal Kaan Akdogan", score: "100" },
    ]); 
    */

    const getStudents = async () => {
        setIsStudentListLoading(true);
        const response = await axios.get(API_URL + "/students");
        console.log(response.data);
        setStudentList(response.data);
        setIsStudentListLoading(false);
    };

    useEffect(() => {
        getStudents();
    }, []);

    const addStudent = async (event) => {
        event.preventDefault();
        setIsStudentValid({ ...student });

        /*  
        if (Object.values(student).every(value => value)) {
            setStudentList(prevStudentList => [...prevStudentList, student]);
            setStudent({ studentName: "", course: "", instructor: "", score: "" });
        } 
        */

        if (!isStudentLoading && Object.values(student).every(value => value)) {
            setIsStudentLoading(true);
            const response = await axios.post(API_URL + "/students", student);
            if (response.status === 201) {
                setStudentList(prevStudentList => [...prevStudentList, response.data]);
            } else {
                alert(response.status);
            }
            setIsStudentLoading(false);
            setStudent({ studentName: "", course: "", instructor: "", score: "" });
        }
    };

    const deleteStudent = async (id) => {
        const response = await axios.delete(API_URL + "/students/" + id);
        if (response.status === 200) {
            setStudentList((prevStudentList) => prevStudentList.filter((student) => student.id !== id));
        } else {
            alert(response.status);
        }
    };

    /**
     * @param {string} id
     * @returns {void}
     */
    const updateStudent = async (id) => {
        const studentIndex = studentList.findIndex((student) => student.id === id);
        const cloneStudentList = [...studentList];
        const backup = studentList[studentIndex];

        cloneStudentList[studentIndex] = currentStudent;

        setStudentList(cloneStudentList);

        try {
            await axios.patch(API_URL + "/students/" + id, currentStudent);
        } catch (error) {
            const cloneStudentList = [...studentList];
            cloneStudentList[studentIndex] = backup;

            setStudentList(cloneStudentList);
        }
    };

    const handleCurrentStudentInputProp = (studentProp) => setCurrentStudent((prevStudent) => ({ ...prevStudent, ...studentProp }));

    const handleStudentInputProp = (studentProp) => setStudent((prevStudent) => ({ ...prevStudent, ...studentProp }));

    return (
        <div className="app">
            <Header title={"Student Manager"} />

            <StudentForm
                student={student}
                handleStudentInputProp={handleStudentInputProp}
                isStudentValid={isStudentValid}
                addStudent={addStudent}
                isStudentLoading={isStudentLoading}
            />

            {isStudentListLoading ? (<p>Loading...</p>) : studentList.length
                ? (
                    <StudentList
                        studentList={studentList}
                        deleteStudent={deleteStudent}
                        updateStudent={updateStudent}
                        handleCurrentStudentInputProp={handleCurrentStudentInputProp}
                    />)
                : (<p>student list is empty</p>)}
        </div>
    );
}

export default App;
