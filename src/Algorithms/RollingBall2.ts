import { Algorithm } from "./_Algorithm";

export const RollingBall2: Algorithm = {
  name: "RollingBall2",
  modelDefinition: [
    {
      valueType: "number",
      valueMaker: "TickingPhaseMaker",
      params: {
        initialValue: 0.4,
        max: 1,
        step: 0.00575,
      },
      id: "phase",
    },
    {
      valueType: "number",
      valueMaker: "TickingPhaseMaker",
      params: {
        initialValue: 0.4,
        max: 1,
        step: 0.0125,
      },
      id: "phase2",
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
        value: 0.065,
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
      valueType: "number",
      valueMaker: "StaticNumberMaker",
      params: {
        value: 0.05,
      },
      id: "radius2",
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

    {
      valueType: "position",
      valueMaker: "RollingBallPositionMaker",
      params: {
        tangent: {
          type: "reference",
          reference: "ballDrawPoint",
        },
        radius: {
          type: "reference",
          reference: "radius2",
        },
        drawDistance: {
          type: "reference",
          reference: "radius2",
        },
        phase: {
          type: "reference",
          reference: "phase2",
        },
      },
      id: "ballCenter2",
    },

    {
      valueType: "position",
      valueMaker: "OrbitingPositionMaker",
      params: {
        center: {
          type: "reference",
          reference: "ballCenter2",
        },
        radius: {
          type: "reference",
          reference: "radius2",
        },

        phase: {
          type: "reference",
          reference: "phase2",
        },
      },
      id: "ballDrawPoint2",
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
      drawType: "DrawBall",
      params: {
        center: {
          type: "reference",
          reference: "ballCenter2",
        },
        position: {
          type: "reference",
          reference: "ballDrawPoint2",
        },
        orbitSize: {
          type: "reference",
          reference: "radius2",
        },
      },
    },

    {
      drawType: "DrawDot",
      params: {
        p1: {
          type: "reference",
          reference: "ballDrawPoint2",
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
