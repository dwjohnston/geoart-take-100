import { Algorithm } from "./_Algorithm";

export const MagicHexagon: Algorithm = {
  name: "Magic Hexagon",
  modelDefinition: [
    {
      valueType: "position",
      valueMakerName: "StaticPositionMaker",
      params: {
        x: 0.3,
        y: 0.1,
      },
      id: "position-a",
    },

    {
      valueType: "position",
      valueMakerName: "StaticPositionMaker",
      params: {
        x: 0.7,
        y: 0.1,
      },
      id: "position-b",
    },

    {
      valueType: "position",
      valueMakerName: "StaticPositionMaker",
      params: {
        x: 0.95,
        y: 0.5,
      },
      id: "position-c",
    },

    {
      valueType: "position",
      valueMakerName: "StaticPositionMaker",
      params: {
        x: 0.7,
        y: 0.9,
      },
      id: "position-d",
    },

    {
      valueType: "position",
      valueMakerName: "StaticPositionMaker",
      params: {
        x: 0.3,
        y: 0.9,
      },
      id: "position-e",
    },

    {
      valueType: "position",
      valueMakerName: "StaticPositionMaker",
      params: {
        x: 0.05,
        y: 0.5,
      },
      id: "position-f",
    },

    {
      valueType: "vertex",
      valueMakerName: "StaticVertexMaker",
      params: {
        pVertex: {
          type: "reference",
          reference: "position-a",
        },
        pLeft: {
          type: "reference",
          reference: "position-b",
        },
        pRight: {
          type: "reference",
          reference: "position-f",
        },
      },
      id: "vertex-a",
    },

    {
      valueType: "vertex",
      valueMakerName: "StaticVertexMaker",
      params: {
        pVertex: {
          type: "reference",
          reference: "position-b",
        },
        pLeft: {
          type: "reference",
          reference: "position-c",
        },
        pRight: {
          type: "reference",
          reference: "position-a",
        },
      },
      id: "vertex-b",
    },

    {
      valueType: "vertex",
      valueMakerName: "StaticVertexMaker",
      params: {
        pVertex: {
          type: "reference",
          reference: "position-c",
        },
        pLeft: {
          type: "reference",
          reference: "position-d",
        },
        pRight: {
          type: "reference",
          reference: "position-b",
        },
      },
      id: "vertex-c",
    },

    {
      valueType: "vertex",
      valueMakerName: "StaticVertexMaker",
      params: {
        pVertex: {
          type: "reference",
          reference: "position-d",
        },
        pLeft: {
          type: "reference",
          reference: "position-e",
        },
        pRight: {
          type: "reference",
          reference: "position-c",
        },
      },
      id: "vertex-d",
    },

    {
      valueType: "vertex",
      valueMakerName: "StaticVertexMaker",
      params: {
        pVertex: {
          type: "reference",
          reference: "position-e",
        },
        pLeft: {
          type: "reference",
          reference: "position-f",
        },
        pRight: {
          type: "reference",
          reference: "position-d",
        },
      },
      id: "vertex-e",
    },

    {
      valueType: "vertex",
      valueMakerName: "StaticVertexMaker",
      params: {
        pVertex: {
          type: "reference",
          reference: "position-f",
        },
        pLeft: {
          type: "reference",
          reference: "position-a",
        },
        pRight: {
          type: "reference",
          reference: "position-e",
        },
      },
      id: "vertex-f",
    },

    {
      valueType: "number",
      valueMakerName: "StaticNumberMaker",
      params: {
        value: 0.1,
      },
      id: "distance",
    },
  ],
  drawMakers: [
    {
      drawType: "DrawImpossible",
      params: {
        thisVertex: {
          type: "reference",
          reference: "vertex-a",
        },
        vertexLeft: {
          type: "reference",
          reference: "vertex-b",
        },
        vertexRight: {
          type: "reference",
          reference: "vertex-f",
        },

        trim: {
          type: "reference",
          reference: "distance",
        },

        leftsLeft: {
          type: "reference",
          reference: "vertex-c",
        },
        rightsRight: {
          type: "reference",
          reference: "vertex-e",
        },
      },
    },
    {
      drawType: "DrawImpossible",
      params: {
        thisVertex: {
          type: "reference",
          reference: "vertex-b",
        },
        vertexLeft: {
          type: "reference",
          reference: "vertex-c",
        },
        vertexRight: {
          type: "reference",
          reference: "vertex-a",
        },
        trim: {
          type: "reference",
          reference: "distance",
        },
        leftsLeft: {
          type: "reference",
          reference: "vertex-d",
        },
        rightsRight: {
          type: "reference",
          reference: "vertex-f",
        },
      },
    },
    {
      drawType: "DrawImpossible",
      params: {
        thisVertex: {
          type: "reference",
          reference: "vertex-c",
        },
        vertexLeft: {
          type: "reference",
          reference: "vertex-d",
        },
        vertexRight: {
          type: "reference",
          reference: "vertex-b",
        },
        trim: {
          type: "reference",
          reference: "distance",
        },
        leftsLeft: {
          type: "reference",
          reference: "vertex-e",
        },
        rightsRight: {
          type: "reference",
          reference: "vertex-a",
        },
      },
    },

    {
      drawType: "DrawImpossible",
      params: {
        thisVertex: {
          type: "reference",
          reference: "vertex-d",
        },
        vertexLeft: {
          type: "reference",
          reference: "vertex-e",
        },
        vertexRight: {
          type: "reference",
          reference: "vertex-c",
        },
        trim: {
          type: "reference",
          reference: "distance",
        },
        leftsLeft: {
          type: "reference",
          reference: "vertex-f",
        },
        rightsRight: {
          type: "reference",
          reference: "vertex-b",
        },
      },
    },

    {
      drawType: "DrawImpossible",
      params: {
        thisVertex: {
          type: "reference",
          reference: "vertex-e",
        },
        vertexLeft: {
          type: "reference",
          reference: "vertex-f",
        },
        vertexRight: {
          type: "reference",
          reference: "vertex-d",
        },
        trim: {
          type: "reference",
          reference: "distance",
        },
        leftsLeft: {
          type: "reference",
          reference: "vertex-a",
        },
        rightsRight: {
          type: "reference",
          reference: "vertex-c",
        },
      },
    },

    {
      drawType: "DrawImpossible",
      params: {
        thisVertex: {
          type: "reference",
          reference: "vertex-f",
        },
        vertexLeft: {
          type: "reference",
          reference: "vertex-a",
        },
        vertexRight: {
          type: "reference",
          reference: "vertex-e",
        },
        trim: {
          type: "reference",
          reference: "distance",
        },
        leftsLeft: {
          type: "reference",
          reference: "vertex-b",
        },
        rightsRight: {
          type: "reference",
          reference: "vertex-d",
        },
      },
    },
  ],
  controlHints: [
    {
      valueMakerId: "3d-angle",
      controlType: "slider",
      params: {
        label: "Angle",
        min: -1 * Math.PI,
        max: Math.PI,
        step: 0.001,
        initialValue: Math.PI / 3,
      },
      visible: true,
    },
  ],
};
