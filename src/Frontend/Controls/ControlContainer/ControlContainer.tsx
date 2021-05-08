import React from "react"; 
import { ControllerMap } from "../../../PureModel/AbstractModelItem";
import { controlMapping } from "../mapping";


type ControlContainerProps = {
    controlConfig: ControllerMap; 
    depth: number; 
    label: string; 
    idList: string[]; 
    onChange: (idList: string[], value: unknown)  => void; 
}


export const ControlContainer = (props: ControlContainerProps) =>  {


    const {controlConfig, depth, label, onChange, idList, } = props; 

    const entries = Object.entries(controlConfig);

    return <div className = "control-container"> 

    <p>
    {label}
    </p> 
        {entries.map(([key, value]) => {

            if (value.controlType) {

                //@ts-ignore
               const ControlClass = controlMapping[value.controlType]; 

                if (!ControlClass) {
                    throw new Error ("Control Class not found"); 
                }


                //@ts-ignore
                return <ControlClass key = {depth + value.id} label = {value.id} id = {value.id} params = {value.params}
                
                    //@ts-ignore
                    onChange = {(_key, value) => {
                        onChange([...idList, key], value); 
                    }}
                /> 

            }
            else {

                //@ts-ignore
                return <ControlContainer depth = {depth+1} key = {depth + value.id} controlConfig = {value} label = {key} idList = {[...idList, key]} onChange= {onChange}/>  
            }
          
            
        })}

    </div> 
}