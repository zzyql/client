import React, { ReactElement, useState } from 'react'
import {TextField,Button,FormControl, InputLabel, Select, MenuItem} from '@material-ui/core'
import gql from 'graphql-tag';
import { useMutation, useQuery  } from '@apollo/react-hooks';

import {CourseType,ProgramType} from '../Interfaces'

interface Props {
    
}
const GET_PROGRAMS = gql`
  {
    programs(orderBy:name_ASC) {
      id
      name
    }
  }
`;
const CREATE_COURSE=gql`
    mutation CREATE_COURSE($id:ID!,$name:String!,$NOS:Int!,$program_id:ID){
        createCourse(data:{
            id:$id
            name:$name
            numOfStudent:$NOS
            program:{
                connect:{id:$program_id}
            }
        }){
            id
            name
            numOfStudent
            program{
                id
                name
            }
        }
    }

`;
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
    

    const [saveCourse, { error, data }]=  useMutation<CourseData,CourseVars>(
        CREATE_COURSE,
        {variables:{id:id,name:name,NOS:Number(numOfStudent),program_id:program}}
    )

    const result = useQuery<ProgramListData,ProgramListVars>(GET_PROGRAMS);
    
    return (
        <div>
        <h3>Add a Course</h3>
            {error ? <p>Oh no! {error.message}</p> : null}
            {data && data.createCourse ? <p>Saved!</p> : null}

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
       
        <InputLabel >Program</InputLabel>
        <Select value={program} onChange={(e)=>setProgram(e.target.value as string)}>
        {result.loading?(
                <MenuItem  disabled>loading....</MenuItem >
        ):(
            result.data?.programs.map(program=>(
                <MenuItem  key={program.id} value={program.id}>
                    {program.name}
                </MenuItem >
            ))
        )}
        </Select>

    


        <br/>
        <Button color="primary" variant="text" onClick={() => id && name && numOfStudent && program && saveCourse()}>
            Create Course
        </Button>
        </div>
        </form>

        </div>
    )
}

