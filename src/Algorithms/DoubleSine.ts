import { Algorithm } from "./_Algorithm";
export const DoubleSineAlgorithm: Algorithm = {
  name: "Double Sine",
  modelDefinition: [
    {
      valueType: "number",
      valueMaker: "StaticNumberMaker",
      params: {
        value: 0.2,
      },
      id: "frequency-1",
    },

    {
      valueType: "number",
      valueMaker: "TickingPhaseMaker",
      params: {
        initialValue: 0,
        max: 1,
        step: 0.01,
      },
      id: "phase-1",
    },

    {
      valueType: "number",
      valueMaker: "Normalizer",
      params: {
        offset: 0,
        numerator: {
          type: "reference",
          reference: "frequency-1",
        },
        denominator: 1 / (Math.PI * 2),
        inputValue: {
          type: "reference",
          reference: "phase-1",
        },
      },
      id: "adjusted-phase-1",
    },

    {
      valueType: "number",
      valueMaker: "SineNumberMaker",
      params: {
        phase: {
          type: "reference",
          reference: "adjusted-phase-1",
        },
        amplitude: 0.5,
      },
      id: "sine-value-1",
    },

    {
      valueType: "number",
      valueMaker: "Normalizer",
      params: {
        offset: 0.5,
        numerator: 1,
        denominator: 1,
        inputValue: {
          type: "reference",
          reference: "sine-value-1",
        },
      },
      id: "y-1",
    },

    {
      valueType: "position",
      valueMaker: "XYPositionMaker",
      params: {
        x: {
          type: "reference",
          reference: "phase-1",
        },
        y: {
          type: "reference",
          reference: "y-1",
        },
      },
      id: "position-1",
    },

    // Number 2
    {
      valueType: "number",
      valueMaker: "StaticNumberMaker",
      params: {
        value: 0.3,
      },
      id: "frequency-2",
    },

    {
      valueType: "number",
      valueMaker: "TickingPhaseMaker",
      params: {
        initialValue: 0,
        max: 1,
        step: 0.01,
      },
      id: "phase-2",
    },

    {
      valueType: "number",
      valueMaker: "Normalizer",
      params: {
        offset: 0,
        numerator: {
          type: "reference",
          reference: "frequency-2",
        },
        denominator: 1 / (Math.PI * 2),
        inputValue: {
          type: "reference",
          reference: "phase-2",
        },
      },
      id: "adjusted-phase-2",
    },
    {
      valueType: "number",
      valueMaker: "SineNumberMaker",
      params: {
        phase: {
          type: "reference",
          reference: "adjusted-phase-2",
        },
        amplitude: 0.5,
      },
      id: "sine-value-2",
    },

    {
      valueType: "number",
      valueMaker: "Normalizer",
      params: {
        offset: 0.5,
        numerator: 1,
        denominator: 1,
        inputValue: {
          type: "reference",
          reference: "sine-value-2",
        },
      },
      id: "y-2",
    },

    {
      valueType: "position",
      valueMaker: "XYPositionMaker",
      params: {
        x: {
          type: "reference",
          reference: "phase-2",
        },
        y: {
          type: "reference",
          reference: "y-2",
        },
      },
      id: "position-2",
    },
  ],
  drawMakers: [
    {
      drawType: "DrawDot",
      params: {
        p1: {
          type: "reference",
          reference: "position-1",
        },
      },
    },

    {
      drawType: "DrawDot",
      params: {
        p1: {
          type: "reference",
          reference: "position-2",
        },
      },
    },

    {
      drawType: "DrawLinker",
      params: {
        p1: {
          type: "reference",
          reference: "position-1",
        },
        p2: {
          type: "reference",
          reference: "position-2",
        },
      },
    },
  ],
  controlHints: [
    {
      valueMakerId: "frequency-1",
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
    {
      valueMakerId: "frequency-2",
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
