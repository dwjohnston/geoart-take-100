import { Algorithm } from "./_Algorithm";

export const SimpleSineAlgorithm: Algorithm = {
  name: "Simple Sine",
  modelDefinition: [
    {
      valueType: "number",
      valueMakerName: "PhasingNumberMaker",
      params: {
        initialValue: 0,
        max: 1,
        step: 0.015,
      },
      id: "phase",
    },

    {
      valueType: "number",
      valueMakerName: "StaticNumberMaker",
      params: {
        value: 0.2,
      },
      id: "frequency",
    },

    {
      valueType: "number",
      valueMakerName: "Normalizer",
      params: {
        offset: 0,
        numerator: {
          type: "reference",
          reference: "phase",
        },
        denominator: 1,
        inputValue: {
          type: "reference",
          reference: "frequency",
        },
      },
      id: "adjusted-phase-a",
    },

    {
      valueType: "number",
      valueMakerName: "Normalizer",
      params: {
        offset: 0,
        numerator: Math.PI * 2,
        denominator: 1,
        inputValue: {
          type: "reference",
          reference: "adjusted-phase-a",
        },
      },
      id: "adjusted-phase-b",
    },

    {
      valueType: "number",
      valueMakerName: "SineNumberMaker",
      params: {
        phase: {
          type: "reference",
          reference: "adjusted-phase-b",
        },
        amplitude: 0.5,
      },
      id: "sine-value",
    },

    {
      valueType: "number",
      valueMakerName: "Normalizer",
      params: {
        offset: 0.5,
        numerator: 1,
        denominator: 1,
        inputValue: {
          type: "reference",
          reference: "sine-value",
        },
      },
      id: "y",
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
        dx: 0, // It would be nice if I could refer to phase.dx
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
