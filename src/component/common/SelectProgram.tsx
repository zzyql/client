import React, { ReactElement, useState } from 'react'
import { Select, MenuItem, InputLabel } from '@material-ui/core'
import { ProgramType } from '../Interfaces'

interface Props {
    programs:ProgramType[]|undefined
    onProgramClick:any
}

export default function SelectProgram(props: Props): ReactElement {

    const programs=props.programs;
    const [program,setProgram]=useState<string>();
    
    

    return (
        <div>
        <InputLabel >Program</InputLabel>
        <Select value={program} onChange={e=>{
            setProgram(e.target.value as string)
            props.onProgramClick(e.target.value as string)
        }}>
        {
            programs?.map(program=>(
                <MenuItem  key={program.id} value={program.id}>
                    {program.name}
                </MenuItem >
            ))
        }
        </Select>
        </div>
    )
}
