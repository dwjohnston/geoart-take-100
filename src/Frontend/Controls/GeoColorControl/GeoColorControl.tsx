import React, { useEffect, useState } from 'react';
import { Color } from '../../../PureModel/AbstractModelItem';
import { AbstractControlId, AbstractControlProps } from '../Abstractions';
import styled from "styled-components";
import { Slider } from '@material-ui/core';
import { colorToString } from '../../../PureModel/Drawables/utils';


export type GeoColorControlProps = AbstractControlProps<
    AbstractControlId,
    {
        label: string;
        initialValue: Color;

    },
    Color
>;


const StyledGeoColorControl = styled.div`
  height: 100%; // I don't like this. But I dont' want the parent to to have to be flex. 
  display: flex;
  flex-flow: column nowrap;


  .sliders {
      flex: 1 0 auto; 
      display: flex; 
      flex-flow: row nowrap; 
      justify-content: stretch;
  }

  .individual-slider {
    display: flex; 
    flex-flow: column nowrap; 
    align-items: center; 
    
    &>span {
        margin: 0.5em 0; 
        font-size: 12px; 
    }

    .slider-container {
        margin: 0.5em 0; 
        flex: 1 1 auto;
    }
  }

  .color-preview {
      height: 1em;
      margin-top: 1em;
  }

`;

export const GeoColorControl = (props: GeoColorControlProps) => {
    const { onChange, params, id } = props;
    const { initialValue, label } = params;


    const [currentValue, setCurrentValue] = useState(initialValue);

    // TODO this logic can probably be moved up a layer. 
    useEffect(() => {

        onChange({
            id,
            value: currentValue
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleChange = (key: keyof Color, value: number) => {

        const newColor = {
            ...currentValue,
            [key]: value
        }

        setCurrentValue(newColor);
        onChange({ id, value: newColor });
    }


    return <>
        <StyledGeoColorControl>
            <p className="label"> {label}</p>
            <div className="sliders">
                {
                    (["r", "g", "b", "a"] as Array<keyof Color>).map((v) => {
                        return <div className="individual-slider">
                            <span>{v}</span>
                            <div className="slider-container">
                                <Slider
                                    orientation="vertical"
                                    value={(currentValue[v])}
                                    min={0}
                                    max={v === "a" ? 1 : 255}
                                    step={v === "a" ? 0.01 : 1}
                                    onChange={(e, value) => {
                                        if (Array.isArray(value)) {
                                            throw new Error("We weren't expecting an array");
                                        }
                                        handleChange(v, value);
                                    }}

                                />
                            </div>
                            <span>{Math.round(currentValue[v] * 100) / 100}</span>
                        </div>
                    })
                }
            </div>

            <div className="color-preview" style={{
                backgroundColor: colorToString(currentValue)
            }}>

            </div>
        </StyledGeoColorControl>
    </>;
};
