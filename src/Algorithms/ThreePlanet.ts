import { Algorithm } from "./_Algorithm";

export const ThreePlanet: Algorithm = {
  name: "Three Planets",
  modelDefinition: [
    {
      id: "center",
      valueType: "position",
      valueMakerName: "StaticPositionMaker",
      params: {
        x: 0.5,
        y: 0.5,
      },
    },
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
      id: "color",
    },

    //PLANET1
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

    //PLANET2
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
      id: "planet-2-radius",
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
      id: "planet-2-phase",
    },

    {
      valueType: "position",
      valueMakerName: "OrbitingPositionMaker",
      params: {
        center: {
          type: "reference",
          reference: "planet1",
        },
        radius: {
          type: "reference",
          reference: "planet-2-radius",
        },

        phase: {
          type: "reference",
          reference: "planet-2-phase",
        },
        color: {
          type: "reference",
          reference: "color",
        },
      },
      id: "planet2",
    },

    //PLANET3
    {
      valueType: "number",
      valueMakerName: "StaticNumberMaker",
      params: {
        value: 0.002,
      },
      id: "planet-3-speed",
    },

    {
      valueType: "number",
      valueMakerName: "StaticNumberMaker",
      params: {
        value: 0.2,
      },
      id: "planet-3-radius",
    },
    {
      valueType: "number",
      valueMakerName: "PhasingNumberMaker",
      params: {
        initialValue: 0,
        max: 1,
        step: {
          type: "reference",
          reference: "planet-3-speed",
        },
      },
      id: "planet-3-phase",
    },

    {
      valueType: "position",
      valueMakerName: "OrbitingPositionMaker",
      params: {
        center: {
          type: "reference",
          reference: "planet2",
        },
        radius: {
          type: "reference",
          reference: "planet-3-radius",
        },

        phase: {
          type: "reference",
          reference: "planet-3-phase",
        },
        color: {
          type: "reference",
          reference: "color",
        },
      },
      id: "planet3",
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
      drawType: "DrawLinker",
      params: {
        p1: {
          type: "reference",
          reference: "planet2",
        },
        p2: {
          type: "reference",
          reference: "planet3",
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
    {
      drawType: "DrawPlanet",
      params: {
        center: {
          type: "reference",
          reference: "planet1",
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
    {
      drawType: "DrawPlanet",
      params: {
        center: {
          type: "reference",
          reference: "planet2",
        },
        position: {
          type: "reference",
          reference: "planet3",
        },
        orbitSize: {
          type: "reference",
          reference: "planet-3-radius",
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
        min: -0.1,
        max: 0.1,
        step: 0.001,
        initialValue: 0.04,
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
        initialValue: 0.2,
      },
      visible: true,
    },
    {
      valueMakerId: "planet-2-speed",
      controlType: "slider",
      params: {
        label: "Planet 2 Speed",
        min: -0.01,
        max: 0.01,
        step: 0.001,
        initialValue: 0.02,
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
        initialValue: 0.2,
      },
      visible: true,
    },
    {
      valueMakerId: "planet-3-speed",
      controlType: "slider",
      params: {
        label: "Planet 3 Speed",
        min: -0.01,
        max: 0.01,
        step: 0.001,
        initialValue: 0.04,
      },
      visible: true,
    },
    {
      valueMakerId: "planet-3-radius",
      controlType: "slider",
      params: {
        label: "Planet 3 Radius",
        min: 0,
        max: 0.5,
        step: 0.01,
        initialValue: 0.2,
      },
      visible: true,
    },
  ],
};
