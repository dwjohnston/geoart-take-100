import React from "react";
import { ComponentContainer } from "../ComponentContainer/ComponentContainer";
import { Debug } from "./Debug";

export const AnObject = () => {
  return (
    <ComponentContainer>
      <Debug
        item={{
          data: "any kind of thing is ok here",
        }}
      />
    </ComponentContainer>
  );
};

export const AString = () => {
  return (
    <ComponentContainer>
      <Debug item="i am string" />
    </ComponentContainer>
  );
};

export default {
  component: Debug,
  title: "StorybookUtils/Debug",
  parameters: {},
};
