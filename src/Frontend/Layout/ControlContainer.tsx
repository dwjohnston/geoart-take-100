import React from "react"; 


type ControlContainerPropers = {}; 
export const ControlContainer = (props: React.PropsWithChildren<ControlContainerPropers>) => {

    const {children} = props; 


    return <div className = "control-container"> 
           {children}
        </div> 
}