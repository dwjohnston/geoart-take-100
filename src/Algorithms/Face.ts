import { Algorithm } from "./_Algorithm";

export const Face: Algorithm = {
  name: "Face",
  modelDefinition: [
    // Planet 1- Face
    {
      valueType: "position",
      valueMakerName: "StaticPositionMaker",
      params: {
        x: 0.5,
        y: 0.5,
      },
      id: "position-center",
    },

    {
      valueType: "number",
      valueMakerName: "StaticNumberMaker",
      params: {
        value: 225 / (365 * 100),
      },
      id: "planet-1-speed",
    },

    {
      valueType: "number",
      valueMakerName: "PhasingNumberMaker",
      params: {
        initialValue: 0.9,
        max: 1,
        step: {
          type: "reference",
          reference: "planet-1-speed",
        },
      },
      id: "planet-phase-1",
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
      valueType: "position",
      valueMakerName: "OrbitingPositionMaker",
      params: {
        center: {
          type: "reference",
          reference: "position-center",
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
          r: 255,
          g: 255,
          b: 255,
          a: 0.01,
        },
      },
      id: "planet1",
    },

    // Planet 2 - Left hand
    {
      valueType: "position",
      valueMakerName: "StaticPositionMaker",
      params: {
        x: 0.5,
        y: 0.5,
      },
      id: "planet-left-center",
    },

    {
      valueType: "number",
      valueMakerName: "StaticNumberMaker",
      params: {
        value: 225 / (365 * 100),
      },
      id: "planet-left-speed",
    },

    {
      valueType: "number",
      valueMakerName: "PhasingNumberMaker",
      params: {
        initialValue: 0.9,
        max: 1,
        step: {
          type: "reference",
          reference: "planet-left-speed",
        },
      },
      id: "planet-left-phase",
    },

    {
      valueType: "number",
      valueMakerName: "StaticNumberMaker",
      params: {
        value: 0.2,
      },
      id: "planet-left-radius",
    },

    {
      valueType: "position",
      valueMakerName: "OrbitingPositionMaker",
      params: {
        center: {
          type: "reference",
          reference: "planet-left-center",
        },
        radius: {
          type: "reference",
          reference: "planet-left-radius",
        },

        phase: {
          type: "reference",
          reference: "planet-left-phase",
        },
        color: {
          r: 255,
          g: 255,
          b: 255,
          a: 0.01,
        },
      },
      id: "planet-left-position",
    },

    // Planet - Right Hand

    {
      valueType: "position",
      valueMakerName: "StaticPositionMaker",
      params: {
        x: 0.5,
        y: 0.5,
      },
      id: "planet-right-center",
    },

    {
      valueType: "number",
      valueMakerName: "StaticNumberMaker",
      params: {
        value: 225 / (365 * 100),
      },
      id: "planet-right-speed",
    },

    {
      valueType: "number",
      valueMakerName: "PhasingNumberMaker",
      params: {
        initialValue: 0.9,
        max: 1,
        step: {
          type: "reference",
          reference: "planet-right-speed",
        },
      },
      id: "planet-right-phase",
    },

    {
      valueType: "number",
      valueMakerName: "StaticNumberMaker",
      params: {
        value: 0.2,
      },
      id: "planet-right-radius",
    },

    {
      valueType: "position",
      valueMakerName: "OrbitingPositionMaker",
      params: {
        center: {
          type: "reference",
          reference: "planet-right-center",
        },
        radius: {
          type: "reference",
          reference: "planet-right-radius",
        },

        phase: {
          type: "reference",
          reference: "planet-right-phase",
        },
        color: {
          r: 255,
          g: 255,
          b: 255,
          a: 0.01,
        },
      },
      id: "planet-right-position",
    },
  ],
  drawMakers: [
    {
      drawType: "DrawPlanet",
      params: {
        center: {
          type: "reference",
          reference: "position-center",
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
    {
      drawType: "DrawPlanet",
      params: {
        center: {
          type: "reference",
          reference: "planet-left-center",
        },
        position: {
          type: "reference",
          reference: "planet-left-position",
        },
        orbitSize: {
          type: "reference",
          reference: "planet-left-radius",
        },
      },
    },
    {
      drawType: "DrawPlanet",
      params: {
        center: {
          type: "reference",
          reference: "planet-right-center",
        },
        position: {
          type: "reference",
          reference: "planet-right-position",
        },
        orbitSize: {
          type: "reference",
          reference: "planet-right-radius",
        },
      },
    },

    {
      drawType: "DrawLinker",
      params: {
        p1: {
          type: "reference",
          reference: "planet1",
        },
        p2: {
          type: "reference",
          reference: "planet-left-position",
        },
      },
    },
    {
      drawType: "DrawLinker",
      params: {
        p1: {
          type: "reference",
          reference: "planet1",
        },
        p2: {
          type: "reference",
          reference: "planet-right-position",
        },
      },
    },
  ],
  controlHints: [
    {
      valueMakerId: "planet-1-speed",
      controlType: "slider",
      params: {
        label: "Planet 1 Speed",
        min: -0.01,
        max: 0.01,
        step: 0.001,
        initialValue: 0.01,
      },
      visible: true,
    },

    {
      valueMakerId: "planet-1-speed",
      controlType: "slider",
      params: {
        label: "Planet 1 Speed",
        min: -0.1,
        max: 0.1,
        step: 0.001,
        initialValue: 0.01,
      },
      visible: true,
    },

    {
      valueMakerId: "planet-1-radius",
      controlType: "slider",
      params: {
        label: "Planet 1 Radius",
        min: 0,
        max: 0.5,
        step: 0.01,
        initialValue: 0.5,
      },
      visible: true,
    },
  ],
};
