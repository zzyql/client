import React, { ReactElement } from 'react'
import { useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { AttendanceSubscriptionPayload} from '../Interfaces';
import {GET_ATTENDANCE} from '../Query'



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
