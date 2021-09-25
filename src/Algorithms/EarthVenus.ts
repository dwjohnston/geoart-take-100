import { Algorithm } from "./_Algorithm";

export const EarthVenusAlgorithm: Algorithm = {
  name: "Earth Venus",
  modelDefinition: [
    {
      valueType: "position",
      valueMakerName: "StaticPositionMaker",
      params: {
        x: 0.5,
        y: 0.5,
      },
      id: "position-center",
    },

    //PLANET 1 RGBA
    {
      valueType: "color",
      valueMakerName: "StaticColorMaker",
      params: {
        value: {
          r: 255,
          g: 0,
          b: 0,
          a: 1,
        },
      },
      id: "planet-1-color",
    },

    //PLANET 1 RGBA
    {
      valueType: "color",
      valueMakerName: "StaticColorMaker",
      params: {
        value: {
          r: 255,
          g: 0,
          b: 0,
          a: 1,
        },
      },
      id: "planet-2-color",
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
      valueMakerName: "PhasingNumberMaker",
      params: {
        initialValue: 0,
        max: 1,
        step: {
          type: "reference",
          reference: "planet-2-speed",
        },
      },
      id: "planet-phase-2",
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
      valueMakerName: "StaticNumberMaker",
      params: {
        value: 0.002,
      },
      id: "planet-2-speed",
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
      valueMakerName: "StaticNumberMaker",
      params: {
        value: 0.4,
      },
      id: "planet-2-radius",
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
          type: "reference",
          reference: "planet-1-color",
        },
      },
      id: "planet1",
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
          reference: "planet-2-radius",
        },

        phase: {
          type: "reference",
          reference: "planet-phase-2",
        },
        color: {
          type: "reference",
          reference: "planet-2-color",
        },
      },
      id: "planet2",
    },
  ],
  drawMakers: [
    {
      drawType: "DrawLinker",
      params: {
        p1: {
          type: "reference",
          reference: "planet1",
        },
        p2: {
          type: "reference",
          reference: "planet2",
        },
      },
    },
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
          reference: "position-center",
        },
        position: {
          type: "reference",
          reference: "planet2",
        },
        orbitSize: {
          type: "reference",
          reference: "planet-2-radius",
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
      valueMakerId: "planet-1-color",
      controlType: "color-control",
      params: {
        label: "Planet 1 Color",
        initialValue: {
          r: 255,
          b: 255,
          g: 0,
          a: 0.5,
        },
      },
      visible: true,
    },
    {
      valueMakerId: "planet-2-color",
      controlType: "color-control",
      params: {
        label: "Planet 1 Color",
        initialValue: {
          r: 0,
          b: 255,
          g: 255,
          a: 0.5,
        },
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
      valueMakerId: "planet-2-speed",
      controlType: "slider",
      params: {
        label: "Planet 2 Speed",
        min: -0.1,
        max: 0.1,
        step: 0.001,
        initialValue: 0.01 * (365 / 225),
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
    {
      valueMakerId: "planet-2-radius",
      controlType: "slider",
      params: {
        label: "Planet 2 Radius",
        min: 0,
        max: 0.5,
        step: 0.01,
        initialValue: 0.5 * 0.7,
      },
      visible: true,
    },
  ],
};
