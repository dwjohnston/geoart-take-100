import { Algorithm } from "./_Algorithm";

export const RollingBall: Algorithm = {
  name: "RollingBall",
  modelDefinition: [
    {
      valueType: "number",
      valueMaker: "TickingPhaseMaker",
      params: {
        initialValue: 0,
        max: 1,
        step: 0.015,
      },
      id: "phase",
    },

    {
      valueType: "position",
      valueMaker: "StaticPositionMaker",
      params: {
        value: {
          x: 0.5,
          y: 0.5,
          dx: 1,
          dy: 0,
        },
      },
      id: "center",
    },

    {
      id: "x",
      valueType: "number",
      valueMaker: "Normalizer",
      params: {
        offset: 0,
        numerator: 1,
        denominator: 1,
        inputValue: {
          type: "reference",
          reference: "phase",
        },
      },
    },

    {
      id: "y",
      valueType: "number",
      valueMaker: "Normalizer",
      params: {
        offset: 0.25,
        numerator: 0,
        denominator: 1,
        inputValue: {
          type: "reference",
          reference: "phase",
        },
      },
    },

    {
      valueType: "position",
      valueMaker: "XYPositionMaker",
      params: {
        x: {
          type: "reference",
          reference: "x",
        },
        y: {
          type: "reference",
          reference: "y",
        },
        dx: {
          type: "reference",
          reference: "x",
        },
        dy: {
          type: "reference",
          reference: "y",
        },
      },
      id: "plane-position",
    },

    {
      valueType: "number",
      valueMaker: "StaticNumberMaker",
      params: {
        value: 0.3,
      },
      id: "radius",
    },

    {
      valueType: "number",
      valueMaker: "StaticNumberMaker",
      params: {
        value: 0.1,
      },
      id: "drawDistance",
    },

    {
      valueType: "position",
      valueMaker: "RollingBallPositionMaker",
      params: {
        tangent: {
          type: "reference",
          reference: "plane-position",
        },
        radius: {
          type: "reference",
          reference: "radius",
        },
        drawDistance: {
          type: "reference",
          reference: "drawDistance",
        },
        phase: {
          type: "reference",
          reference: "phase",
        },
      },
      id: "ballDrawPoint",
    },
  ],
  drawMakers: [
    {
      drawType: "DrawDot",
      params: {
        p1: {
          type: "reference",
          reference: "ballDrawPoint",
        },
      },
    },
    {
      drawType: "DrawPlanet",
      params: {
        center: {
          type: "reference",
          reference: "plane-position",
        },
        position: {
          type: "reference",
          reference: "ballDrawPoint",
        },
        orbitSize: {
          type: "reference",
          reference: "radius",
        },
      },
    },
    {
      drawType: "DrawDot",
      params: {
        p1: {
          type: "reference",
          reference: "plane-position",
        },
      },
    },
  ],
  controlHints: [],
};
