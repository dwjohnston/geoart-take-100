import {
  findPointAlongLine,
  findPointAtAngleAndDistanceFromLine,
  rotatePointAboutPoint,
} from "../Math";
import { Algorithm } from "./_Algorithm";

export const MagicTriangle: Algorithm = {
  name: "Magic Triangle",
  modelDefinition: [
    {
      valueType: "position",
      valueMakerName: "StaticPositionMaker",
      params: {
        x: 0.5,
        y: 0.1,
      },
      id: "position-a",
    },

    {
      valueType: "position",
      valueMakerName: "StaticPositionMaker",
      params: {
        x: 0.9,
        y: 0.9,
      },
      id: "position-b",
    },

    {
      valueType: "position",
      valueMakerName: "StaticPositionMaker",
      params: {
        x: 0.1,
        y: 0.9,
      },
      id: "position-c",
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
          reference: "vertex-b",
        },
        pRight: {
          type: "reference",
          reference: "vertex-c",
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
          reference: "vertex-c",
        },
        pRight: {
          type: "reference",
          reference: "vertex-a",
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
          reference: "vertex-e",
        },
        pRight: {
          type: "reference",
          reference: "vertex-f",
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
          reference: "position-c",
        },
        pLeft: {
          type: "reference",
          reference: "vertex-a",
        },
        pRight: {
          type: "reference",
          reference: "vertex-b",
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
          reference: "position-c",
        },
        pLeft: {
          type: "reference",
          reference: "vertex-a",
        },
        pRight: {
          type: "reference",
          reference: "vertex-b",
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
        pVertex: {
          type: "reference",
          reference: "vertex-a",
        },
        pVertexLeft: {
          type: "reference",
          reference: "vertex-b",
        },
        pVertexRight: {
          type: "reference",
          reference: "vertex-c",
        },
        trim: {
          type: "reference",
          reference: "distance",
        },
      },
    },
    {
      drawType: "DrawImpossible",
      params: {
        pVertex: {
          type: "reference",
          reference: "vertex-b",
        },
        pVertexLeft: {
          type: "reference",
          reference: "vertex-c",
        },
        pVertexRight: {
          type: "reference",
          reference: "vertex-a",
        },
        trim: {
          type: "reference",
          reference: "distance",
        },
      },
    },
    {
      drawType: "DrawImpossible",
      params: {
        pVertex: {
          type: "reference",
          reference: "vertex-c",
        },
        pVertexLeft: {
          type: "reference",
          reference: "vertex-a",
        },
        pVertexRight: {
          type: "reference",
          reference: "vertex-b",
        },
        trim: {
          type: "reference",
          reference: "distance",
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
