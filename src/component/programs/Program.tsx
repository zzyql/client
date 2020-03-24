import React, { ReactElement, Fragment } from 'react'
import gql from 'graphql-tag';
import { useLazyQuery ,useQuery} from '@apollo/react-hooks';

import {ProgramType} from '../Interfaces'
import './programList.css'
const GET_PROGRAM = gql`
  query GetUser($id:string!)
  {
    program(id:$id) {
      id
      name
    }
  }
`;

interface ProgramData {
    program: ProgramType;
}
  
interface ProgramVars {
    id: string;
}
interface Props {
    id:string;
}
export default function Program(props: Props): ReactElement {



    const { loading, data } = useQuery<ProgramData,ProgramVars>(
        GET_PROGRAM,
        { variables: { id: props.id } }
    );

    return (
        <Fragment>
        {loading ? (
            <p>Loading ...</p>
          ) : (
            <Fragment>
                {data?.program.id}
            </Fragment>
          )}
        </Fragment>
    )
}

