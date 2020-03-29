import React, { ReactElement } from 'react'
import { useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { AttendanceSubscriptionPayload} from '../Interfaces';


const GET_ATTENDANCE=gql`
    subscription GET_ATTENDANCE{
        attendance{
            mutation
            node{
                time
                student{
                    id
                    firstName
                }
            }
        }
    }
  
`;

interface CheckIn{
    attendance:AttendanceSubscriptionPayload
}

interface Props {
   
}

export default function Attendance({}: Props): ReactElement{
    const { loading, data } = useSubscription<CheckIn>(GET_ATTENDANCE);
    return (
        <div>
            {loading ? 'Loading...' : data!.attendance.node.time}
        </div>
    )
}
