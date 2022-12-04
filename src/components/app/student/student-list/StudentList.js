import React, { useState } from "react";
import StudentCard from "../student-card/StudentCard";

const StudentList = ({ studentList }) => {

    // const [searchInput, setSearchInput] = useState("");

    const [searchResult, setSearchResult] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // const handleSearchInput = (searchValue) => setSearchInput(searchValue);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
        const normalizedSearchTerm = event.target.value.trim().toLowerCase();
        if (normalizedSearchTerm) {
            setSearchResult(
                // studentList.filter(student => student.studentName.trim().toLowerCase().includes(normalizedSearchTerm))
                studentList.filter(student => Object.values(student).some(value => value.trim().toLowerCase().includes(normalizedSearchTerm)))
            )
        }
        else {
            setSearchResult([])
        }
    }

    return (
        <>
            {/* 
            {studentList.length &&
                <div className="student-search">
                    <input type="text"
                        onChange={(event) => handleSearchInput(event.target.value.trim().toLowerCase())}
                        placeholder="Search..." />
                </div>
            }
            <div className="student-container">
                {studentList.map((student, index) => (
                    Object.values(student).some(value => value.trim().toLowerCase().includes(searchInput)) && <StudentCard student={student} key={index} />
                    // student.studentName.includes(searchStudent) && <StudentCard student={student} key={index} />
                ))}
            </div>
            */}
            <div className="student-list-container">
                <h2>Student List</h2>
                <input
                    className="searchbar"
                    type="search"
                    placeholder="Search student..."
                    onChange={handleSearch}
                    value={searchTerm}
                />
                <div className="student-container">
                    {/* 
                    {searchResult.length
                        ? searchResult.map((student, index) => <StudentCard student={student} key={index} />)
                        : studentList.map((student, index) => <StudentCard student={student} key={index} />)}
                    */}
                    {searchTerm
                        ? (searchResult.length
                            ? searchResult.map((student, index) => <StudentCard student={student} key={index} />)
                            : <div className="message">
                                <h4>Student Not Found</h4>
                            </div>)
                        : studentList.map((student, index) => <StudentCard student={student} key={index} />)}
                </div>
            </div>
        </>
    );
};

export default StudentList;