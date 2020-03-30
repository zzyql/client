import React, { ReactElement, Fragment } from 'react'
import gql from 'graphql-tag';
import { useLazyQuery ,useQuery} from '@apollo/react-hooks';
import Program from './Program'
import {List,ListItem,Collapse,Typography} from '@material-ui/core';
import {ProgramType} from '../Interfaces'
import './programList.css'
import {GET_PROGRAMS} from '../Query'

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
            <List>
            {data && data.programs.map(program => (
                <ListItem key={program.id} className="program-list"> <Program program={program}/> </ListItem>

            ))}
            </List>
            </Fragment>
          )}
        </Fragment>
    )
}




