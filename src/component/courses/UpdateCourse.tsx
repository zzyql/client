import React, { ReactElement, Fragment,useState } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import { useLazyQuery ,useQuery, useMutation} from '@apollo/react-hooks';
import {ExpansionPanel ,ExpansionPanelSummary ,ExpansionPanelDetails ,Typography ,List,ListItem, TextField, Button} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { NavLink, withRouter, Route } from "react-router-dom";
import {ProgramType, CourseType} from '../Interfaces'
import {UPDATE_COURSE}from '../Query'
import Course from '../courses/Course';


interface CourseData {
    updateCourse: CourseType;
}
  
interface CourseVars {
    id: string;
    name:string;
}
interface Props {
    course:CourseType;
}


//this component get program type as props and display program infomation
export default function UpdateCourse(props: Props): ReactElement {

  
  const [name, setName] = useState(props.course.name)
  const [id, setID] = useState(props.course.id)

  const [saveCourse, { error, data }]=  useMutation<CourseData,CourseVars>(
    UPDATE_COURSE,
    {variables:{id:id,name:name}}
  )

  return (
    <div>
    <h3>Update a Program</h3>
    {error ? <p>Oh no! {error.message}</p> : null}
    {data && data.updateCourse 
        ? 
    <p>Saved!</p> 
        : 

    <div className="UpdateCourse">
    <TextField
    placeholder="Enter the Course name"
    label="Course Name"
    value={name}
    onChange={e=>setName(e.target.value)}
    />
    <br/>
    <TextField disabled
    placeholder="Enter Course ID"
    label="Course ID"
    value={id}
    onChange={e=>setID(e.target.value)}
    />
    <br/>
    <Button color="primary" variant="text" onClick={() => id && name &&  saveCourse()}>
        Update Course
    </Button>
    </div>


    }

    </div>
  )
}

