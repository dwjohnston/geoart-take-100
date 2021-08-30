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
import { ControlContainer } from "../ControlContainer/ControlContainer";
import { GeoColorControl } from "../GeoColorControl/GeoColorControl";
import { GeoSlider } from "../GeoSlider/GeoSlider";
export type ControlPanelProps = {
  controls: Array<ControlConfig<AbstractControlType>>;
  controlHints: Array<ControlHint>;
  onSuperSpeedChange: (value: number) => void;
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
  "color-control": GeoColorControl,
};

const StyledControlPanel = styled.div`
  height: 250px;
  display: flex;
  flex-flow: row nowrap;
`;

export const ControlPanel = (props: ControlPanelProps) => {
  const { controls, onChange, controlHints, onSuperSpeedChange } = props;

  const controlHintMap = controlHints.reduce((acc, cur) => {
    return {
      ...acc,
      [cur.valueMakerId]: cur,
    };
  }, {} as Record<string, ControlHint>);

  return (
    <StyledControlPanel>
      <GeoSlider
        id="super-speed"
        onChange={(v) => onSuperSpeedChange(v.value)}
        params={{
          min: 1,
          max: 30,
          step: 1,
          label: "Super Speed",
          initialValue: 1,
        }}
      />

      {controls.map((v) => {
        const { type, id, params } = v;

        const Component = controlMap[type];

        const controlHint = controlHintMap[v.id];

        const paramsToUse = (controlHint && controlHint.params) || params;
        const doDisplayControl = controlHint ? controlHint.visible : true;

        return doDisplayControl ? (
          <ControlContainer key={id}>
            {/* @ts-ignore - I think we need generic typings */}
            <Component {...{ id, onChange, params: paramsToUse }} />
          </ControlContainer>
        ) : null;
      })}
    </StyledControlPanel>
  );
};
