import React, { ReactElement, Fragment } from 'react'
import { StudentType,AttendanceSubscriptionPayload } from '../Interfaces'
import { useQuery,useSubscription } from '@apollo/react-hooks'
import  gql  from 'graphql-tag';

import {List,ListItem,Collapse,Typography} from '@material-ui/core';


import Attendance from '../attendances/Attendance';


interface CheckIn{
    attendance:AttendanceSubscriptionPayload
}
const GET_ATTENDANCE=gql`
    subscription GET_ATTENDANCE{
        attendance{
            mutation
            node{
                student{
                    enrollments{
                        course{
                            attendances{
                                time
                            }
                        }
                    }
                }
            }
        }
    }
  
`;
const GET_STUDENT=gql`
    query GET_STUDENT($student_id:ID){
    student(where:{id:$student_id}){
        id
        firstName
        LastName
        email
        status
        program{
            id
            name
        }
        enrollments(where:{
            course:{
                enrollments_every:{
                    student:{id:"1111111"}
                }
            }
        }){
            id
            course{
                id
                name
                attendances{
                    time
                }
            }
        }
        
    }
  }
`;
interface StudentData{
    student:StudentType;
}
interface StudentVars{
    student_id:string
}

interface Props {
    match:any
}

export default function Student(props: Props): ReactElement {
    console.log(props.match.params.id)
    const{loading,data,refetch}=useQuery<StudentData,StudentVars>(
        GET_STUDENT,
        {variables:{student_id:props.match.params.id}}
    )
    const sub=useSubscription<CheckIn>(GET_ATTENDANCE);
    if(!sub.loading) refetch()
    const [open, setOpen] = React.useState(true);
    return (
        <div>
        {loading ? (
            <p>Loading ...</p>
          ) : (
            <Fragment>
            
            {console.log(data)}
            <Typography variant="h5" gutterBottom>
                {data && data.student.firstName} {data && data.student.LastName}
            </Typography>
            <Typography variant="h5" gutterBottom>
                {data && data.student.email}
            </Typography>
            
            {data && data.student.enrollments.map(enrollment=>(
                
                <List>
                    <ListItem button onClick={()=>(setOpen(!open))} >
                        {enrollment.course.name}
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List>
                        {enrollment.course.attendances.map(att=>(
                            <ListItem >{att.time}</ListItem>
                        ))}
                        </List>
                    </Collapse>
                </List>
                
            ))}
            
            </Fragment>
          )}
        </div>
    )
}
