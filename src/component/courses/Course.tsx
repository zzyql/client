import React, { ReactElement } from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { CourseType } from '../Interfaces';


const Get_COURSE = gql`
  query Get_COURSE($coure_id: string!) {
    course(where: {id:$coure_id}) {
      id
      model
      year
      stock
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
            a course
        </div>
    )
}
