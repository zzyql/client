import React, { ReactElement } from 'react'

interface Props {
    match:any
}

export default function Course(props: Props): ReactElement {
    console.log(props.match.params.id)
    return (
        <div>
            a course
        </div>
    )
}
