import { Algorithm } from "./_Algorithm";

export const RollingBall2: Algorithm = {
  name: "RollingBall2",
  modelDefinition: [
    {
      id: "center",
      valueType: "position",
      valueMakerName: "StaticPositionMaker",
      params: {
        value: {
          x: 0.5,
          y: 0.5,
          dx: 0,
          dy: 0,
        },
      },
    },
    {
      valueType: "number",
      valueMakerName: "StaticNumberMaker",
      params: {
        value: 0.002,
      },
      id: "planet-1-speed",
    },

    {
      valueType: "number",
      valueMakerName: "StaticNumberMaker",
      params: {
        value: 0.2,
      },
      id: "planet-1-radius",
    },
    {
      valueType: "number",
      valueMakerName: "PhasingNumberMaker",
      params: {
        initialValue: 0,
        max: 1,
        step: {
          type: "reference",
          reference: "planet-1-speed",
        },
      },
      id: "planet-phase-1",
    },
    {
      valueType: "position",
      valueMakerName: "OrbitingPositionMaker",
      params: {
        center: {
          type: "reference",
          reference: "center",
        },
        radius: {
          type: "reference",
          reference: "planet-1-radius",
        },

        phase: {
          type: "reference",
          reference: "planet-phase-1",
        },
        color: {
          type: "reference",
          reference: "color",
        },
      },
      id: "planet1",
    },
    {
      valueType: "color",
      valueMakerName: "StaticColorMaker",
      params: {
        r: 255,
        g: 255,
        b: 255,
        a: 0.3,
      },
      id: "color",
    },
    {
      valueType: "number",
      valueMakerName: "PhasingNumberMaker",
      params: {
        initialValue: 0.4,
        max: 1,
        step: {
          type: "reference",
          reference: "mid-speed",
        },
      },
      id: "phase",
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
          reference: "planet-1-radius",
        },
      },
      id: "planet-circumference",
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
          reference: "radius",
        },
      },
      id: "mid-circumference",
    },

    {
      valueType: "number",
      valueMakerName: "Normalizer",
      params: {
        offset: 0,
        numerator: {
          type: "reference",
          reference: "planet-1-speed",
        },
        denominator: {
          type: "reference",
          reference: "mid-circumference",
        },
        inputValue: {
          type: "reference",
          reference: "planet-circumference",
        },
      },
      id: "mid-speed",
    },

    {
      valueType: "number",
      valueMakerName: "PhasingNumberMaker",
      params: {
        initialValue: 0.4,
        max: 1,
        step: 0.0125,
      },
      id: "phase2",
    },

    {
      valueType: "number",
      valueMakerName: "StaticNumberMaker",
      params: {
        value: 1,
      },
      id: "deltaX",
    },
    {
      valueType: "number",
      valueMakerName: "StaticNumberMaker",
      params: {
        value: 0.1,
      },
      id: "deltaY",
    },

    {
      id: "x",
      valueType: "number",
      valueMakerName: "Normalizer",
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
      valueMakerName: "Normalizer",
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
      valueMakerName: "XYPositionMaker",
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
      valueMakerName: "StaticNumberMaker",
      params: {
        value: 0.065,
      },
      id: "radius",
    },

    {
      valueType: "number",
      valueMakerName: "StaticNumberMaker",
      params: {
        value: 0.1,
      },
      id: "drawDistance",
    },

    {
      valueType: "number",
      valueMakerName: "StaticNumberMaker",
      params: {
        value: 0.05,
      },
      id: "radius2",
    },

    {
      valueType: "position",
      valueMakerName: "TangentOffsetPositionMaker",
      params: {
        tangent: {
          type: "reference",
          reference: "planet1",
        },
        radius: {
          type: "reference",
          reference: "radius",
        },
      },
      id: "ballCenter",
    },

    {
      valueType: "position",
      valueMakerName: "OrbitingPositionMaker",
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
        color: {
          r: 255,
          g: 255,
          b: 255,
          a: 255,
        },
      },
      id: "ballDrawPoint",
    },

    {
      valueType: "position",
      valueMakerName: "TangentOffsetPositionMaker",
      params: {
        tangent: {
          type: "reference",
          reference: "ballDrawPoint",
        },
        radius: {
          type: "reference",
          reference: "radius2",
        },
      },
      id: "ballCenter2",
    },

    {
      valueType: "position",
      valueMakerName: "OrbitingPositionMaker",
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
        color: {
          r: 255,
          g: 255,
          b: 255,
          a: 255,
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
      drawType: "DrawPlanet",
      params: {
        center: {
          type: "reference",
          reference: "center",
        },
        position: {
          type: "reference",
          reference: "planet1",
        },
        orbitSize: {
          type: "reference",
          reference: "planet-1-radius",
        },
      },
    },
  ],
  controlHints: [],
};
