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
  ControlHint,
  ControlTypeMap,
} from "../Abstractions";
import { ControlContainer } from '../ControlContainer/ControlContainer';
import { GeoSlider } from "../GeoSlider/GeoSlider";
export type ControlPanelProps = {
  controls: Array<ControlConfig<AbstractControlType>>;
  controlHints: Array<ControlHint>
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
  const { controls, onChange, controlHints } = props;

  const controlHintMap = controlHints.reduce((acc, cur) => {
    return {
      ...acc,
      [cur.valueMakerId]: cur
    }
  }, {} as Record<string, ControlHint>);

  return (
    <StyledControlPanel>
      {controls.map((v) => {

        const { type, id, params } = v;

        const Component = controlMap[type];

        const controlHint = controlHintMap[v.id];
        
        const paramsToUse = (controlHint && controlHint.params) || params; 
        const doDisplayControl = controlHint ? controlHint.visible : true; 


        return doDisplayControl ? <ControlContainer key ={id}>
          <Component {...{ id, onChange, params: paramsToUse }} />
        </ControlContainer> : null;
      })}
    </StyledControlPanel>
  );
};
