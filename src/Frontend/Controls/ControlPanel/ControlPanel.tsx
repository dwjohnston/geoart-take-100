import React, { FunctionComponent } from "react";
import styled from "styled-components";
import {
  AbstractControlId,
  AbstractControlInputParams,
  AbstractControlOutput,
  AbstractControlOutputValue,
  AbstractControlProps,
  AbstractControlType,
  ControlConfig,
  ControlTypeMap,
} from "../Abstractions";
import { GeoSlider } from "../GeoSlider/GeoSlider";
export type ControlPanelProps = {
  controls: Array<ControlConfig<AbstractControlType>>;
  onChange: (
    value: AbstractControlOutput<AbstractControlId, AbstractControlOutputValue>
  ) => void;
};

type ControlMap = {
  [K in keyof ControlTypeMap]: FunctionComponent<
    AbstractControlProps<
      AbstractControlId,
      ControlTypeMap[K]["input"],
      ControlTypeMap[K]["output"]
    >
  >;
};

const controlMap: ControlMap = {
  slider: GeoSlider,
};

const StyledControlPanel = styled.div`
  height: 200px;
  display: flex;
  flex-flow: row nowrap;
`;

export const ControlPanel = (props: ControlPanelProps) => {
  const { controls, onChange } = props;

  return (
    <StyledControlPanel>
      {controls.map((v) => {
        const Component = controlMap[v.type];

        const { type, id, params } = v;

        //@ts-ignore
        return <Component {...{ id, onChange, params }} />;
      })}
    </StyledControlPanel>
  );
};
