import React, { ReactElement, Fragment,useState } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import { useLazyQuery ,useQuery, useMutation} from '@apollo/react-hooks';
import {ExpansionPanel ,ExpansionPanelSummary ,ExpansionPanelDetails ,Typography ,List,ListItem, TextField, Button} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { NavLink, withRouter, Route } from "react-router-dom";
import {ProgramType} from '../Interfaces'
import {UPDATE_PROGRAM}from '../Query'
import './programList.css'
import Course from '../courses/Course';


interface ProgramData {
    updateProgram: ProgramType;
}
  
interface ProgramVars {
    id: string;
    name:string;
}
interface Props {
    program:ProgramType;
}


//this component get program type as props and display program infomation
export default function UpdateProgram(props: Props): ReactElement {

  
  const [name, setName] = useState(props.program.name)
  const [id, setID] = useState(props.program.id)

  const [saveProgram, { error, data }]=  useMutation<ProgramData,ProgramVars>(
    UPDATE_PROGRAM,
    {variables:{id:id,name:name}}
  )

  return (
    <div>
    <h3>Update a Program</h3>
        {error ? <p>Oh no! {error.message}</p> : null}
        {data && data.updateProgram ? 
            <p>Saved!</p> : 


    <div className="CreateProgram">
    <TextField
    placeholder="Enter the Program name"
    label="Program Name"
    value={name}
    onChange={e=>setName(e.target.value)}
    />
    <br/>
    <TextField disabled
    placeholder="Enter program ID"
    label="Program ID"
    value={id}
    onChange={e=>setID(e.target.value)}
    />
    <br/>
    <Button color="primary" variant="text" onClick={() => id && name &&  saveProgram()}>
        Update Program
    </Button>
    </div>


        }

    </div>
  )
}

