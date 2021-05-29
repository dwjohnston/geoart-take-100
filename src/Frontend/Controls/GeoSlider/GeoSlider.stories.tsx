import React, { useState } from 'react';
import { Debug } from '../../DebugTools/Debug';
import { ComponentContainer } from '../../StorybookUtils/ComponentContainer/ComponentContainer';
import { AbstractControlOutputValue, AbstractControlOutput, AbstractControlId } from '../Abstractions';
import { GeoSlider, SliderProps } from './GeoSlider';

export const NoFlex = () => {

    const [value, setValue] = useState<AbstractControlOutput<AbstractControlId, number> | null>();


    const inputConfig = {
        id: "1234",
        onChange: (payload: AbstractControlOutput<AbstractControlId, number>) => {
            setValue(payload)
        },
        params: {
            label: "Slider",
            min: 1,
            max: 10,
            initialValue: 5,
            step: 1,
        }
    };

    return (

        <> 
           <p>
                nb. Note that the GeoSlider expects a flex parent in order to give it height.
            </p>
        <ComponentContainer height={200}>

            <GeoSlider {...inputConfig} />
        </ComponentContainer>

        </>
    );
};


export const Flex = () => {

    const [value, setValue] = useState<AbstractControlOutput<AbstractControlId, number> | null>();


    const inputConfig = {
        id: "1234",
        onChange: (payload: AbstractControlOutput<AbstractControlId, number>) => {
            setValue(payload)
        },
        params: {
            label: "Slider",
            min: 1,
            max: 10,
            initialValue: 5,
            step: 1,
        }
    };

    return (
        <> 
        <p>
             nb. Note that the GeoSlider expects a flex parent in order to give it height.
         </p>

         <Debug item = {value} label = "value"/> 
         <Debug item = {inputConfig} label="inputConfig"/> 
        <ComponentContainer height={200} style={{
            display: "flex",
            flexFlow: "row nowrap",
        }}>
  
            <GeoSlider {...inputConfig} />
        </ComponentContainer>
        </>
    );
};

export default {
    component: GeoSlider,
    title: 'Controls/GeoSlider',
    parameters: {
    },
};
