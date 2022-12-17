import React, { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineCheck } from "react-icons/ai";

/**
 * @param {{
 *  studentList: Student[]
 *  deleteStudent: (id: string) => void
 *  updateStudent: (id: string) => void
 *  handleCurrentStudentInputProp: (params: InputProps) => void
 * }} param0 
 * @returns {JSX.Element}
 */
const StudentCard = ({
    student,
    deleteStudent,
    updateStudent,
    handleCurrentStudentInputProp,
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isEditable, setIsEditable] = useState(false);

    return (
        <>
            <div className="student-card">
                <div className="student-card-buttons">
                    {isEditable ? (
                        <span className="save-button">
                            <AiOutlineCheck
                                onClick={() => {
                                    setIsEditable(false);
                                    updateStudent(student.id);
                                }}
                            />
                        </span>
                    ) : (
                        <span id={student.id}
                            className="edit-button"
                            onClick={() => {
                                setIsEditable(true);
                            }}>
                            <AiOutlineEdit />
                        </span>
                    )}

                    {isLoading ? (
                        <div className="lds-dual-ring"></div>
                    ) : (
                        <span id={student.id}
                            className="delete-button"
                            onClick={() => {
                                setIsLoading(true);
                                deleteStudent(student.id);
                            }}>
                            <AiOutlineDelete />
                        </span>
                    )}
                </div>
                <div className="student-card-content">
                    {isEditable ? (
                        <div>
                            <span className='student-data'>Instructor: </span>
                            <input type={"text"}
                                placeholder={student.instructor}
                                onChange={(e) => {
                                    handleCurrentStudentInputProp({ instructor: e.target.value });
                                }}
                            />
                            {!isEditable && <p><span className='student-data'>Instructor: </span>{student.instructor}</p>}
                        </div>
                    ) : (<p><span className='student-data'>Instructor: </span>{student.instructor}</p>)}
                    <p>
                        <span className='student-data'>Student Name: </span>
                        <input type={"text"}
                                placeholder={student.studentName}
                                onChange={(e) => {
                                    handleCurrentStudentInputProp({ studentName: e.target.value });
                                }}
                            />
                        {/* <span contentEditable={isEditable}
                            suppressContentEditableWarning="true"
                            onInput={(event) => {
                                handleCurrentStudentInputProp({ studentName: event.currentTarget.textContent });
                            }}>
                            {student.studentName}
                        </span> */}
                    </p>
                    <p>
                        <span className='student-data'>Course: </span>
                        <span contentEditable={isEditable}
                            suppressContentEditableWarning="true"
                            onInput={(event) => {
                                handleCurrentStudentInputProp({ course: event.currentTarget.textContent });
                            }}>
                            {student.course}
                        </span>
                    </p>
                   {/*  <p>
                        <span className='student-data'>Instructor: </span>
                        <span contentEditable={isEditable}
                            suppressContentEditableWarning="true"
                            onInput={(event) => {
                                handleCurrentStudentInputProp({ instructor: event.currentTarget.textContent });
                            }}>
                            {student.instructor}
                        </span>
                    </p> */}
                    <p>
                        <span className='student-data'>Score: </span>
                        <span contentEditable={isEditable}
                            suppressContentEditableWarning="true"
                            onInput={(event) => {
                                handleCurrentStudentInputProp({ score: event.currentTarget.textContent });
                            }}>
                            {student.score}
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default StudentCard;