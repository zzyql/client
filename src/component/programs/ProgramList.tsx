import React, { ReactElement } from 'react'
import gql from 'graphql-tag';
import { useLazyQuery ,useQuery} from '@apollo/react-hooks';

import {Program} from '../Interfaces'

const GET_PROGRAMS = gql`
  {
    programs {
      id
      name
    }
  }
`;

interface ProgramListData {
    programs: Program[];
}
  
interface ProgramListVars {

}
interface Props {
    
}
export default function ProgramList({}: Props): ReactElement {

    const { loading, data } = useQuery<ProgramListData,ProgramListVars>(GET_PROGRAMS);
    console.log(data)
    
    return (
        <div>
        {loading ? (
            <p>Loading ...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {data && data.programs.map(program => (
                  <tr>
                    <td>{program.id}</td>
                    <td>{program.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
    )
}




