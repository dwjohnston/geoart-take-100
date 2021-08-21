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
      valueType: "number",
      valueMaker: "StaticNumberMaker",
      params: {
        value: 1,
      },
      id: "deltaX",
    },
    {
      valueType: "number",
      valueMaker: "StaticNumberMaker",
      params: {
        value: 0.1,
      },
      id: "deltaY",
    },

    {
      id: "x",
      valueType: "number",
      valueMaker: "Normalizer",
      params: {
        offset: 0,
        numerator: {
          type: "reference",
          reference: "deltaX",
        },
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
        numerator: {
          type: "reference",
          reference: "deltaY",
        },
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
          reference: "deltaX",
        },
        dy: {
          type: "reference",
          reference: "deltaY",
        },
      },
      id: "plane-position",
    },

    {
      valueType: "number",
      valueMaker: "StaticNumberMaker",
      params: {
        value: 0.2,
      },
      id: "radius",
    },

    {
      valueType: "number",
      valueMaker: "StaticNumberMaker",
      params: {
        value: 0.3,
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
      id: "ballCenter",
    },
    {
      valueType: "position",
      valueMaker: "OrbitingPositionMaker",
      params: {
        center: {
          type: "reference",
          reference: "ballCenter",
        },
        radius: {
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
      drawType: "DrawBall",
      params: {
        center: {
          type: "reference",
          reference: "ballCenter",
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
