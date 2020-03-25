import React, { ReactElement, Fragment } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag';
import { NavLink } from 'react-router-dom';
import { StudentType } from '../Interfaces';

const GET_STUDENTS = gql`
  query GET_STUDENTS($course_id:string){
    students(course_id:$course_id){
      id
      first_name
      last_name
    }
  }
`;
interface StudentListData {
    students: StudentType[];
}
  
interface StudentListVars {
    course_id:string;
}

interface Props {
    match:any
}

export default function StudentList(props: Props): ReactElement {
    const{loading,data}= useQuery<StudentListData,StudentListVars>(
        GET_STUDENTS,
        {variables:{course_id:props.match.params.id}}
    );
    return (
        <div>
            Student list
            {loading ? (
                <p>Loading ...</p>
              ) : (
                <Fragment>
                {"course list.."}
                {data && data.students.map(student => (
                    <li key={student.id} className="student-list"> 
                        
                    </li>
                ))}
                </Fragment>
              )}
        </div>
    )
}
