import React, { ReactElement, Fragment } from 'react'
import { StudentType } from '../Interfaces'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost';

const GET_STUDENT=gql`
    query GET_STUDENT($student_id:string){
    students(course_id:$course_id){
      id
      first_name
      last_name
    }
  }
`;
interface StudentData{
    student:StudentType;
}
interface StudentVars{
    student_id:string
}

interface Props {
    match:any
}

export default function Student(props: Props): ReactElement {
    
    const{loading,data}=useQuery<StudentData,StudentVars>(
        GET_STUDENT,
        {variables:{student_id:props.match.params.id}}
    )
    return (
        <div>
        {loading ? (
            <p>Loading ...</p>
          ) : (
            <Fragment>
            {"course list.."}
            {data && data.student.firstName}
            {data && data.student.LastName}
            {data && data.student.email}
            {data && data.student.enrollments.map(enrollment=>(
                enrollment.course
            ))}
            {data && data.student.attendances.map(attendance=>(
                attendance.time
            ))}
            </Fragment>
          )}
        </div>
    )
}
