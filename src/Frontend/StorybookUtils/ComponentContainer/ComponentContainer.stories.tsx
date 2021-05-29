import React from "react";
import { ComponentContainer } from "./ComponentContainer";

export const Default = () => {
  return (
    <>
      <ComponentContainer>
        <p>This is a component container.</p>

        <p>Put anything you want in here.</p>
      </ComponentContainer>
    </>
  );
};

export default {
  component: ComponentContainer,
  title: "StorybookUtils/ComponentContainer",
  parameters: {},
};
