import React, { ReactElement, Fragment, useState } from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { CourseType } from '../Interfaces';
import { NavLink } from 'react-router-dom';
import {ExpansionPanel ,ExpansionPanelSummary ,ExpansionPanelDetails ,Typography ,List,ListItem, Button} from '@material-ui/core';
import {GET_COURSE} from '../Query'
import UpdateCourse from './UpdateCourse';


interface CourseData{
    course:CourseType
}
interface CourseVars{
    coure_id:string
}
interface Props {
    match:any
}


export default function Course(props: Props): ReactElement {
    console.log(props.match.params.id)
    const [update, setUpdate] = useState(false);
    const { loading, data } = useQuery<CourseData, CourseVars>(
        GET_COURSE,
        { variables: { coure_id: props.match.params.id } }
      );


    return (
        <Fragment>
        {update ? (
          data && <UpdateCourse course={data.course}></UpdateCourse>
        ) : (
          <Fragment>
          
          <Typography variant="h5" gutterBottom>
            Course ID: {data && data.course.id}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Program name: {data && data.course.program.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Course name: {data && data.course.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Students: {data && data.course.numOfStudent}
          </Typography>
          
          Student List
          {data && data.course.enrollments.map(enrollment=>(
            <NavLink to={"/student/"+enrollment.student.id}>
            <ListItem key={enrollment.student.id}>
              {enrollment.student.firstName} {enrollment.student.LastName}
            </ListItem>
            </NavLink>
          ))} 
          

          <Button onClick={()=>setUpdate(!update)}>update</Button>
          </Fragment>

        )}
        
        </Fragment>
    )
}
