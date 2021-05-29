import React from "react"; 


type DebugProps = {

    item: unknown; 
    label?: string; 
}


export const Debug = (props: DebugProps) => {

    const {item, label} = props; 

    return <div> 
        {label && <p> {label}</p>    }

        <pre> {JSON.stringify(item)} </pre>

    </div> 
}