import React, { ReactElement, Fragment } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag';
import { NavLink } from 'react-router-dom';
import { StudentType } from '../Interfaces';

const GET_STUDENTS = gql`
  {
    students{
      id
      firstName
      LastName
    }
  }
`;
interface StudentListData {
    students: StudentType[];
}
  
interface StudentListVars {
    student_id:string;
}

interface Props {
    match:any
}

export default function StudentList(props: Props): ReactElement {
    const{loading,data}= useQuery<StudentListData,StudentListVars>(
        GET_STUDENTS
    );
    return (
        <div>
            Student list
            {loading ? (
                <p>Loading ...</p>
              ) : (
                <Fragment>
                {data && data.students.map(student => (
                    <li key={student.id} className="student-list"> 
                    <NavLink to={"/student/"+student.id}> {student.firstName} {student.LastName}</NavLink>
                    </li>
                ))}
                </Fragment>
              )}
        </div>
    )
}
