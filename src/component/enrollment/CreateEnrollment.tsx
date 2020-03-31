import React, { ReactElement, useState } from 'react'
import {TextField,Button,FormControl, InputLabel, Select, MenuItem} from '@material-ui/core'
import gql from 'graphql-tag';
import { useMutation, useQuery  } from '@apollo/react-hooks';

import {CourseType,ProgramType, EnrollmentType} from '../Interfaces'
import {CREATE_COURSE,GET_PROGRAMS, CREATE_ENROLLMENT} from '../Query'
import SelectProgram from '../common/SelectProgram';
import SelectCourses from '../common/SelectCourses';
interface Props {
    student_id:string
}


interface EnrollmentData{
    enrollment:EnrollmentType
}
interface EnrollmentVars{

}

export default function CreateEnrollment(props: Props): ReactElement {

    const [id, setID] = useState(props.student_id)
    const [program, setProgram] = useState("")
    const [course, setCourse] = useState("")

    function onProgramClick(program_id:string):any{
        setProgram(program_id)
    }
    function onCourseClick(course_id:string):any{
        setCourse(course_id)
    }
    {console.log(id)}

    const [saveEnrollment, { error, data }]=useMutation<EnrollmentData,EnrollmentVars>(
        CREATE_ENROLLMENT,
        {
            variables:{student_id:props.student_id,course_id:course}
        }
    )
    
    return (
        <div>
        <h3>Add a Course</h3>
        {error ? <p>Oh no! {error.message}</p> : null}
        {data && data.enrollment 
            ? 
        <p>Saved!</p> 
            : 
        <div>
        <SelectCourses onProgramClick={onProgramClick} onCourseClick={onCourseClick}/>
        <Button color="primary" variant="text" onClick={() => 
            id && course  && saveEnrollment() }>
            Update User
        </Button>
        </div>
        }

        </div>
    )
}

