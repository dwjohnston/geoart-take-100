import React from "react";
import { ComponentContainer } from "../../StorybookUtils/ComponentContainer/ComponentContainer";
import { ControlPanel } from "./ControlPanel";
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
import { Debug } from "../../DebugTools/Debug";

export const Default = () => {
  const [value, setValue] = React.useState({});

  const handleChange = (
    incomingValue: AbstractControlOutput<
      AbstractControlId,
      AbstractControlOutputValue
    >
  ) => {
    setValue({
      ...value,
      [incomingValue.id]: incomingValue.value,
    });
  };

  return (
    <>
      <Debug item={value} />
      <ComponentContainer>
        <ControlPanel
          algorithmKey="foo"
          onSuperSpeedChange={() => undefined}
          controlHints={[]}
          onChange={handleChange}
          controls={[
            {
              type: "slider",
              id: "slider1",
              params: {
                label: "slider 1",
                min: 1,
                max: 10,
                initialValue: 5,
                step: 1,
              },
            },
            {
              type: "slider",
              id: "slider2",
              params: {
                label: "slider 2",
                min: 10,
                max: 100,
                initialValue: 14,
                step: 1,
              },
            },
          ]}
        />
      </ComponentContainer>
    </>
  );
};

export default {
  component: ControlPanel,
  title: "Controls/ControlPanel",
  parameters: {},
};
