import { ReactComponent } from "*.svg";

import React from "react"; 
import {Slider} from "@material-ui/core"; 
type SliderProps = {
    label: string; 
    min: number; 
    max: number; 
    initialValue: number; 
    step: number; 
    id:string; 
    onChange:  (id: string, value: number) => void 

}

export const GeoSlider = (props: SliderProps)  => {


    const {label, min, max, initialValue, step, onChange, id}= props; 
    return <div className = "geo-slider"> <p> {label}</p> 

    <div> 
    <Slider
        orientation = "vertical"
        defaultValue = {initialValue}
        min = {min} 
        max= {max}
        step = {step}
        onChange = {(e, value) => {

            if (Array.isArray(value)){
                throw new Error("We weren't expecting an array"); 
            }
            onChange(id, value)
        }}
        />
        </div> 
        </div>; 

    }
