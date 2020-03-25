import React, { ReactElement, Fragment } from 'react'
import gql from 'graphql-tag';
import { useLazyQuery ,useQuery} from '@apollo/react-hooks';
import Program from './Program'

import {ProgramType} from '../Interfaces'
import './programList.css'
const GET_PROGRAMS = gql`
  {
    programs {
      id
      name
    }
  }
`;

interface ProgramListData {
    programs: ProgramType[];
}
  
interface ProgramListVars {

}
interface Props {
    
}
export default function ProgramList({}: Props): ReactElement {

    const { loading, data } = useQuery<ProgramListData,ProgramListVars>(GET_PROGRAMS);

    return (
        <Fragment>
        {loading ? (
            <p>Loading ...</p>
          ) : (
            <Fragment>
            {data && data.programs.map(program => (
                <li key={program.id} className="program-list"> <Program program={program}/> </li>

            ))}
            </Fragment>
          )}
        </Fragment>
    )
}




