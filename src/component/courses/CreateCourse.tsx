import React, { ReactElement, useState } from 'react'
import {TextField,Button,FormControl, InputLabel, Select, MenuItem} from '@material-ui/core'
import gql from 'graphql-tag';
import { useMutation, useQuery  } from '@apollo/react-hooks';

import {CourseType,ProgramType} from '../Interfaces'
import {CREATE_COURSE,GET_PROGRAMS} from '../Query'
import SelectProgram from '../common/SelectProgram';
interface Props {
    
}


interface ProgramListData {
    programs: ProgramType[];
}
  
interface ProgramListVars {

}

interface CourseData{
    createCourse:CourseType
}
interface CourseVars {
    id: string;
    name:string;
    NOS:number;
    program_id:string
}

export default function CreateProgram({}: Props): ReactElement {

    const [name, setName] = useState("")
    const [id, setID] = useState("")
    const [numOfStudent, setNOS] = useState("")
    const [program, setProgram] = useState("")
    
    function onProgramClick(program_id:string):any{
        setProgram(program_id)
    }
    const [saveCourse, { error, data }]=  useMutation<CourseData,CourseVars>(
        CREATE_COURSE,
        {variables:{id:id,name:name,NOS:Number(numOfStudent),program_id:program}}
    )

    const result = useQuery<ProgramListData,ProgramListVars>(GET_PROGRAMS);
    
    return (
        <div>
        <h3>Add a Course</h3>
        {error ? <p>Oh no! {error.message}</p> : null}
        {data && data.createCourse 
            ? 
        <p>Saved!</p> 
            : 
        <form>
        <div className="CreateCourse">
        <TextField
        placeholder="Enter the course name"
        label="Course Name"
        value={name}
        onChange={e=>setName(e.target.value)}
        />
        <br/>
        <TextField
        placeholder="Enter course ID"
        label="Course ID"
        value={id}
        onChange={e=>setID(e.target.value)}
        />
        <br/>
        <TextField
        placeholder="Enter number of student"
        label="Number of student"
        value={numOfStudent}
        onChange={e=>setNOS(e.target.value)}
        />
        <br/>
       
        <SelectProgram programs={result.data?.programs} onProgramClick={onProgramClick}/>
 
        <br/>
        <Button color="primary" variant="text" onClick={() => id && name && numOfStudent && program && saveCourse()}>
            Create Course
        </Button>
        </div>
        </form>
        
        }

        </div>
    )
}

