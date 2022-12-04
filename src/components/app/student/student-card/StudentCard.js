import React from "react";

const StudentCard = ({ student }) => {
    return (
        <>
            <div className="student-card">
                <p><span className='student-data'>Student Name: </span>{student.studentName}</p>
                <p><span className='student-data'>Course: </span>{student.course}</p>
                <p><span className='student-data'>Instructor: </span>{student.instructor}</p>
                <p><span className='student-data'>Score: </span>{student.score}</p>
            </div>
        </>
    );
};

export default StudentCard;