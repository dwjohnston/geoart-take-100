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
          reference: "position-b",
        },
        pRight: {
          type: "reference",
          reference: "position-c",
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
          reference: "position-a",
        },
        pRight: {
          type: "reference",
          reference: "position-b",
        },
      },
      id: "vertex-c",
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
          reference: "vertex-c",
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
          reference: "vertex-b",
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
          reference: "vertex-c",
        },
        vertexLeft: {
          type: "reference",
          reference: "vertex-a",
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
          reference: "vertex-b",
        },
        rightsRight: {
          type: "reference",
          reference: "vertex-a",
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
