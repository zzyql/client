import React, { ReactElement, Fragment } from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { CourseType } from '../Interfaces';
import { NavLink } from 'react-router-dom';
import {ExpansionPanel ,ExpansionPanelSummary ,ExpansionPanelDetails ,Typography ,List,ListItem} from '@material-ui/core';

const Get_COURSE = gql`
  query Get_COURSE($coure_id: ID!) {
    course(where: {id:$coure_id}) {
      id
      name
      numOfStudent
      program{
        name
      }
      enrollments{
        student{
          id
          firstName
          LastName
        }
      }

    }
  }
`;

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

    const { loading, data } = useQuery<CourseData, CourseVars>(
        Get_COURSE,
        { variables: { coure_id: props.match.params.id } }
      );


    return (
        <Fragment>
        {loading ? (
          <p>Loading ...</p>
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
          
          </Fragment>
        )}
        </Fragment>
    )
}
