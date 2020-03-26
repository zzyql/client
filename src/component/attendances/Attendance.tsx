import React, { ReactElement } from 'react'
import { gql } from 'apollo-boost'


const GET_ATTENDANCE=gql`
    query GET_ATTENDANCE($course_id:string,$student_id:string){
        attendance(course_id:$course_id,student_id:$student_id){
            
        }
    }
`;

interface Props {
    course_id:string;
    student_id:string;
}

export default function Attendance(props: Props): ReactElement {

    return (
        <div>
            
        </div>
    )
}
