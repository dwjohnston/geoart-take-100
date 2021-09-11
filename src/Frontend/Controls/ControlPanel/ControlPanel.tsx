import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { useTracking } from "../../Providers/TrackingProvider";
import { debounce } from "lodash";

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
  algorithmKey: string;
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
  const { controls, onChange, controlHints, onSuperSpeedChange, algorithmKey } =
    props;

  const { trackControlChanged } = useTracking();

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
        onChange={(v, isMount) => {
          onSuperSpeedChange(v.value);

          if (!isMount) {
            trackControlChanged({
              controlKey: "superSpeed",
              controlType: "slider",
            });
          }
        }}
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

        const debouncedFunction = debounce(
          () =>
            trackControlChanged({
              controlKey: id,
              controlType: type,
            }),
          1000,
          {
            leading: false,
          }
        );

        const handleChange = (...params: Parameters<typeof onChange>) => {
          onChange(...params);

          // @ts-ignore Is there a better way to do this?
          if (!params[1]) {
            debouncedFunction();
          }
        };

        // // I really don't like this, but I'm feeling lazy.
        // // Basically it's a 'when the thing mounts, you need to do an on change'
        // // But I don't want to fire the tracking event
        // // Several things wrong with this:
        // // - This is a render, not a mount. This could fire unnecessarily
        // // - We don't know that the params will have an initialValue

        // onChange({
        //   id,
        //   value: params.initialValue
        // })

        console.log(algorithmKey, id);

        return doDisplayControl ? (
          <ControlContainer>
            {/* @ts-ignore - I think we need generic typings */}
            <Component
              // The key is necessary to remount the controls between algorithm switches
              key={`${algorithmKey}-${id}`}
              {...{ id, onChange: handleChange, params: paramsToUse }}
            />
          </ControlContainer>
        ) : null;
      })}
    </StyledControlPanel>
  );
};
