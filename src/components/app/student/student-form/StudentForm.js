import React from "react";

const StudentForm = ({ student, handleStudentInputProp, isStudentValid, addStudent }) => {
    return (
        <>
            <form action="">
                <div className="input-control">
                    <input
                        type="text"
                        onChange={(event) => handleStudentInputProp({ studentName: event.target.value })}
                        value={student.studentName}
                        placeholder="Enter student name..."
                    />
                    {!isStudentValid.studentName && <p className="input-error">Name cannot be empty</p>}
                </div>
                <div className="input-control">
                    <input
                        type="text"
                        onChange={(event) => handleStudentInputProp({ course: event.target.value })}
                        value={student.course}
                        placeholder="Enter course..."
                    />
                    {!isStudentValid.course && <p className="input-error">Course cannot be empty</p>}
                </div>
                <div className="input-control">
                    <input
                        type="text"
                        onChange={(event) => handleStudentInputProp({ instructor: event.target.value })}
                        value={student.instructor}
                        placeholder="Enter instructor name..."
                    />
                    {!isStudentValid.instructor && <p className="input-error">Instructor cannot be empty</p>}
                </div>
                <div className="input-control">
                    <input
                        type="text"
                        onChange={(event) => handleStudentInputProp({ score: event.target.value })}
                        value={student.score}
                        placeholder="Enter score..."
                    />
                    {!isStudentValid.score && <p className="input-error">Score cannot be empty</p>}
                </div>

                <button
                    className="btn btn-primary"
                    onClick={addStudent}>
                    Add Student
                </button>
            </form>
        </>
    );
};

export default StudentForm;