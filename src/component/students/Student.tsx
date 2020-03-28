import React, { ReactElement, Fragment } from 'react'
import { StudentType } from '../Interfaces'
import { useQuery } from '@apollo/react-hooks'
import  gql  from 'graphql-tag';

const GET_STUDENT=gql`
    query GET_STUDENT($student_id:ID){
    student(where:{id:$student_id}){
        id
        firstName
        LastName
        email
        status
        program{
            id
            name
        }
        enrollments{
            id
            course{
                id
                name
            }
        }
        attendances{
            id
            time
        }
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
    console.log(props.match.params.id)
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
            
            {console.log(data)}
            <li>{data && data.student.firstName} {data && data.student.LastName}</li>
            
            <li>{data && data.student.email}</li>
            {data && data.student.enrollments.map(enrollment=>(
                enrollment.course.name
            ))}
            {data && data.student.attendances.map(attendance=>(
                attendance.time
            ))}
            </Fragment>
          )}
        </div>
    )
}
