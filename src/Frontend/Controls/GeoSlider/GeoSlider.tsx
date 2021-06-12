import { ReactComponent } from "*.svg";

import React, { useState } from "react";
import { Slider } from "@material-ui/core";
import { AbstractControlId, AbstractControlProps } from "../Abstractions";
import styled from "styled-components";

export type SliderProps = AbstractControlProps<
  AbstractControlId,
  {
    label: string;
    min: number;
    max: number;
    initialValue: number;
    step: number;
  },
  number
>;

const StyledGeoSlider = styled.div`
  height: 100%; // I don't like this. But I dont' want the parent to to have to be flex. 
  display: flex;
  flex-flow: column nowrap;
  .label {
  }

  .body {
    flex: 1 0 auto;
  }
`;

export const GeoSlider = (props: SliderProps) => {
  const { params, onChange, id } = props;
  const { min, max, initialValue, step, label } = params;


  const [currentValue, setCurrentValue] = useState(initialValue); 


  return (
    <StyledGeoSlider className="geo-slider">
      <p className="label"> {label}</p>

      <div className="body">
        <Slider
          orientation="vertical"
          defaultValue={initialValue}
          min={min}
          max={max}
          step={step}
          onChange={(e, value) => {
            if (Array.isArray(value)) {
              throw new Error("We weren't expecting an array");
            }
            setCurrentValue(value);
            onChange({ id, value });
          }}
        />
      </div>
      <div>
        {currentValue}
      </div>
    </StyledGeoSlider>
  );
};
