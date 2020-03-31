import React, { ReactElement, useState } from 'react'
import { TextField, Button, InputLabel, Select, MenuItem, Typography } from '@material-ui/core'
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ProgramType, StudentType, EnrollmentType } from '../Interfaces';
import { GET_PROGRAMS, UPDATE_STUDENT , CREATE_ENROLLMENT} from '../Query';
import SelectProgram from '../common/SelectProgram';
import SelectCourses from '../common/SelectCourses';

interface Props {
    student:StudentType
}
interface ProgramListData {
    programs: ProgramType[];
}
  
interface ProgramListVars {

}
interface StudentData {
    updateStudent: StudentType;
}
  
interface StudentVars {

}

interface EnrollmentData {
    enrollment:EnrollmentType;
}
  
interface EnrollmentVars {

}

export default function Signup(props: Props): ReactElement {
    const student=props.student
    const [firstName, setFirstName] = useState(student.firstName)
    const [lastName, setLastName] = useState(student.LastName)
    const [program, setProgram] = useState(student.program.id)
    const [password, setPassword] = useState(student.password)
    const [id, setID] = useState(student.id)
    const [email, setEmail] = useState(student.email)
    const [courses,setCourse]=useState<string[]>();


    function onProgramClick(program_id:string):any{
        console.log("selected progra id is "+program_id)
        setProgram(program_id)
    }
    

    function onCourseClick(courses:string[]):any{
        setCourse(courses)
        console.log(courses)
    }


    const result = useQuery<ProgramListData,ProgramListVars>(GET_PROGRAMS);

    {console.log(id)}
    const [saveStudent, { error, data }]=  
    useMutation<StudentData,StudentVars>(
        UPDATE_STUDENT,
        {variables:{
            id:id,
            firstName:firstName,
            lastName:lastName,
            password:password,
            program_id:program
        }}
    )


    return (
        <div>
        <h3>Update User</h3>
            {error ? <p>Oh no! {error.message}</p> : null}
            {data && data.updateStudent 
                ? 
            <div>
            <p>Saved!</p> 
            <Typography variant="h5" gutterBottom>
                Student ID: {data && data.updateStudent.id}
            </Typography>
            <Typography variant="h5" gutterBottom>
                Student name: {data && data.updateStudent.firstName} {data.updateStudent.LastName}
            </Typography>
            <Typography variant="h5" gutterBottom>
                Student Email: {data && data.updateStudent.email}
            </Typography>
            <Typography variant="h5" gutterBottom>
                Status: {data && data.updateStudent.status}
            </Typography>
            </div>
                : 
            <div>
                <form>
                <TextField
                    disabled
                    placeholder="Enter your ID"
                    label="ID"
                    value={id}
                    />
                <br/>
                <TextField
                    placeholder="Enter your first name"
                    label="First Name"
                    value={firstName}
                    onChange={e=>{
                        setFirstName(e.target.value)

                        }}
                    />
                <br/>
                <TextField
                placeholder="Enter your last name"
                label="Last Name"
                value={lastName}
                onChange={e=>{
                    setLastName(e.target.value)

                }}
                />
                <br/>
                <TextField
                placeholder="Enter your password"
                type="password"
                label="Password"
                value={password}
                onChange={e=>{
                    setPassword(e.target.value)

                }}
                />
                <br/>

                <TextField
                disabled
                placeholder="Enter your email"
                label="Email"
                value={email}
                />
                
                <br/>
                <SelectCourses onProgramClick={onProgramClick} onCourseClick={onCourseClick}/>
                <br/>
                <Button color="primary" variant="text" onClick={() => 
                    id && firstName && lastName && password && program && saveStudent() }>
                    Update User
                </Button>
            </form>
            </div>
            }
        </div>
    )
}


