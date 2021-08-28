import { Algorithm } from "./_Algorithm";

export const StraightWave: Algorithm = {
  name: "Straight Wave",
  modelDefinition: [
    {
      valueType: "number",
      valueMakerName: "PhasingNumberMaker",
      params: {
        initialValue: 0,
        max: 1,
        step: 0.0015,
      },
      id: "phase",
    },

    {
      valueType: "number",
      valueMakerName: "StaticNumberMaker",
      params: {
        value: 1,
      },
      id: "frequency",
    },
    {
      valueType: "number",
      valueMakerName: "StaticNumberMaker",
      params: {
        value: 0.9,
      },
      id: "amplitude",
    },
    {
      valueType: "number",
      valueMakerName: "StaticNumberMaker",
      params: {
        value: 0.2,
      },
      id: "width",
    },
    {
      valueType: "number",
      valueMakerName: "StaticNumberMaker",
      params: {
        value: 0.2,
      },
      id: "slope",
    },

    {
      valueType: "number",
      valueMakerName: "Normalizer",
      params: {
        offset: 0.5,
        numerator: -0.5,
        denominator: 1,
        inputValue: {
          type: "reference",
          reference: "raw-y",
        },
      },
      id: "y",
    },

    {
      valueType: "number",
      valueMakerName: "StraightWaveMaker",
      params: {
        frequency: {
          type: "reference",
          reference: "frequency",
        },
        amplitude: {
          type: "reference",
          reference: "amplitude",
        },
        width: {
          type: "reference",
          reference: "width",
        },
        slope: {
          type: "reference",
          reference: "slope",
        },
        currentPhase: {
          type: "reference",
          reference: "phase",
        },
      },
      id: "raw-y",
    },

    {
      valueType: "position",
      valueMakerName: "XYPositionMaker",
      params: {
        x: {
          type: "reference",
          reference: "phase",
        },
        y: {
          type: "reference",
          reference: "y",
        },
        dx: 0,
        dy: 0,
      },
      id: "position",
    },
  ],
  drawMakers: [
    {
      drawType: "DrawDot",
      params: {
        p1: {
          type: "reference",
          reference: "position",
        },
      },
    },
  ],
  controlHints: [
    {
      valueMakerId: "frequency",
      controlType: "slider",
      params: {
        label: "Frequency",
        min: 0.01,
        max: 10,
        step: 0.1,
        initialValue: 1,
      },
      visible: true,
    },
  ],
};
