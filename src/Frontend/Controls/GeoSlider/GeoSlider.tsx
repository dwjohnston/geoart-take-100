import React, { useEffect, useState } from "react";
import { Slider } from "@material-ui/core";
import { AbstractControlId, AbstractControlProps } from "../Abstractions";
import styled from "styled-components";
import { toSignificantFigures } from "../../../utils/toSignificantFigures";

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

  width: 8em;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  .label {
  }

  .body {
    flex: 1 0 auto;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    margin-bottom: 1em;
  }
`;

export const GeoSlider = (props: SliderProps) => {
  const { params, onChange, id } = props;
  const { min, max, initialValue, step, label } = params;
  const [currentValue, setCurrentValue] = useState(initialValue);

  // TODO this logic can probably be moved up a layer.
  useEffect(() => {
    onChange(
      {
        id,
        value: currentValue,
      },
      true
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledGeoSlider className="geo-slider">
      <p className="label"> {label}</p>

      <div className="body">
        <Slider
          orientation="vertical"
          value={currentValue}
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
        <span style={{ width: "8em" }}>{`${toSignificantFigures(
          currentValue,
          3
        )}`}</span>
      </div>
    </StyledGeoSlider>
  );
};
