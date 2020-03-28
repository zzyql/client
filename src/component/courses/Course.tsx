import React, { ReactElement, Fragment } from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { CourseType } from '../Interfaces';
import { NavLink } from 'react-router-dom';


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
        <div>
        {loading ? (
          <p>Loading ...</p>
        ) : (
          <Fragment>
          
          {console.log(data)}
          <li>{data && data.course.id} </li>
          <li>{data && data.course.program.name} </li>
          <li>{data && data.course.name} </li>
          <li>{data && data.course.numOfStudent} </li>
          <li>{data && data.course.enrollments.map(enrollment=>(
            <NavLink to={"/student/"+enrollment.student.id}>
            <li>{enrollment.student.firstName} {enrollment.student.LastName}</li>
            </NavLink>
          ))} 
          </li>
          </Fragment>
        )}
        </div>
    )
}
