import React, { ReactElement, useState, ChangeEvent } from 'react'
import { Select, MenuItem, InputLabel, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core'
import {  CourseType, ProgramType } from '../Interfaces'
import SelectProgram from './SelectProgram';
import { GET_PROGRAMS, GET_COURSES_BY_PROGRAM_ID } from '../Query';
import { useQuery } from '@apollo/react-hooks';

interface Props {
    onProgramClick:any
    onCourseClick:any
}
interface ProgramListData {
    programs: ProgramType[];
}
  
interface CourseData{
    courses:CourseType[]|undefined
}
interface CourseVars{
    program_id:string
}
interface ProgramListVars {

}
export default function SelectCourses(props: Props): ReactElement {

    const [program_id,setProgram]=useState<string>("");
    const [course,setCourse]=useState<string>();
    

    const {loading,data} = useQuery<ProgramListData,ProgramListVars>(GET_PROGRAMS);


    const result = useQuery<CourseData,CourseVars>(
        GET_COURSES_BY_PROGRAM_ID,
        {variables:{program_id:program_id}}
    );
    function onProgramClick(program_id:string):any{
        setProgram(program_id)
        props.onProgramClick(program_id)
    }
    function onCourseClick(course_id:string):any{
        setCourse(course_id)
        props.onCourseClick(course_id)
    }

    const [state, setState] = React.useState({});
    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });

        let selected:string[]=[];
    
        for (let [key, value] of Object.entries(state)) {
            console.log(key, value);
            if(value) selected.push(key)
        }
        props.onCourseClick(selected)

        
    };

    return (
        <div>
        {loading
            ?
        <div>loading....</div>
            :
        <SelectProgram programs={data?.programs} onProgramClick={onProgramClick}/>
        }
        

        <br/>
        <InputLabel >Course</InputLabel>
        {console.log(result)}
        <FormGroup row>
            {
                result.data?.courses?.map(course=>(

                    <FormControlLabel
                    control={
                        <Checkbox 
                        onChange={handleChange} 
                        name={course.id} />
                    }
                    label={course.name}
                    />
                ))
            }
        </FormGroup>

        </div>
    )
}