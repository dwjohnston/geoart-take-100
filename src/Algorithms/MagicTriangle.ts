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
        x: 0.7,
        y: 0.1,
      },
      id: "vertex-a",
    },

    {
      valueType: "position",
      valueMakerName: "StaticPositionMaker",
      params: {
        x: 0.9,
        y: 0.7,
      },
      id: "vertex-b",
    },

    {
      valueType: "position",
      valueMakerName: "StaticPositionMaker",
      params: {
        x: 0.1,
        y: 0.9,
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

    {
      valueType: "number",
      valueMakerName: "StaticNumberMaker",
      params: {
        value: 0.1,
      },
      id: "3d-angle",
    },

    // {
    //     valueType:"position",
    //     valueMakerName: "StaticPositionMaker",
    //     params: findPointAtAngleAndDistanceFromLine({
    //         x: 0.1,
    //         y: 0.9,
    //         dx:0,
    //         dy:0,
    //     },
    //     {
    //         x: 0.9,
    //         y: 0.1,
    //         dx:0,
    //         dy:0,
    //     },
    //     3,
    //     0.4, ),
    //     id: "vertex-c-a"
    // },

    {
      valueType: "position",
      valueMakerName: "NormaliseByFunctionPositionMaker",
      params: {
        p0: {
          type: "reference",
          reference: "vertex-c",
        },
        p1: {
          type: "reference",
          reference: "vertex-a",
        },
        p2: {
          // not used
          type: "reference",
          reference: "vertex-b",
        },
        distance: {
          type: "reference",
          reference: "distance",
        },
        angle: {
          type: "reference",
          reference: "3d-angle",
        },
        fn: (p0, p1, p2, distance, angle) => {
          console.log({ p0, p1, distance, angle });
          return findPointAtAngleAndDistanceFromLine(p0, p1, distance, angle);
        },
      },
      id: "vertex-c-a",
    },

    {
      valueType: "position",
      valueMakerName: "NormaliseByFunctionPositionMaker",
      params: {
        p0: {
          type: "reference",
          reference: "vertex-a-a",
        },
        p1: {
          type: "reference",
          reference: "vertex-c",
        },
        p2: {
          // not used
          type: "reference",
          reference: "vertex-c",
        },
        distance: {
          type: "reference",
          reference: "distance",
        },
        angle: {
          type: "reference",
          reference: "3d-angle",
        },
        fn: (p0, p1, p2, distance, angle) => {
          // const xd = findPointAlongLine(p0, p1, distance);

          // const xb = findPointAlongLine(xd, p2, distance);

          const xb = findPointAlongLine(p0, p2, distance);
          return xb;
        },
      },
      id: "vertex-a-b",
    },

    {
      valueType: "position",
      valueMakerName: "NormaliseByFunctionPositionMaker",
      params: {
        p0: {
          type: "reference",
          reference: "vertex-a",
        },
        p1: {
          type: "reference",
          reference: "vertex-b-a",
        },
        p2: {
          // not used
          type: "reference",
          reference: "vertex-c",
        },
        distance: {
          type: "reference",
          reference: "distance",
        },
        angle: {
          type: "reference",
          reference: "3d-angle",
        },
        fn: (p0, p1, p2, distance, angle) => {
          // const xd = findPointAlongLine(p1, p2, distance);
          // const xb = findPointAlongLine(xd, p0, distance);

          const xb = findPointAlongLine(p1, p0, distance);

          return xb;
        },
      },
      id: "vertex-b-b",
    },

    {
      valueType: "position",
      valueMakerName: "NormaliseByFunctionPositionMaker",
      params: {
        p0: {
          type: "reference",
          reference: "vertex-a",
        },
        p1: {
          type: "reference",
          reference: "vertex-b",
        },
        p2: {
          // not used
          type: "reference",
          reference: "vertex-c-a",
        },
        distance: {
          type: "reference",
          reference: "distance",
        },
        angle: {
          type: "reference",
          reference: "3d-angle",
        },
        fn: (p0, p1, p2, distance, angle) => {
          const xd = findPointAlongLine(p2, p1, distance);
          //const xb = findPointAlongLine(xd, p1, distance);

          return xd;
        },
      },
      id: "vertex-c-b",
    },

    {
      valueType: "position",
      valueMakerName: "NormaliseByFunctionPositionMaker",
      params: {
        p0: {
          type: "reference",
          reference: "vertex-a",
        },
        p1: {
          type: "reference",
          reference: "vertex-b-b",
        },
        p2: {
          // not used
          type: "reference",
          reference: "vertex-c-b",
        },

        distance: {
          type: "reference",
          reference: "distance",
        },
        angle: {
          type: "reference",
          reference: "3d-angle",
        },
        fn: (p0, p1, p2, distance, angle) => {
          const xd = findPointAlongLine(p0, p1, distance * 2);

          const xc = findPointAlongLine(xd, p2, distance);

          return xc;
        },
      },
      id: "vertex-a-c",
    },

    {
      valueType: "position",
      valueMakerName: "NormaliseByFunctionPositionMaker",
      params: {
        p0: {
          type: "reference",
          reference: "vertex-a",
        },
        p1: {
          type: "reference",
          reference: "vertex-b",
        },
        p2: {
          // not used
          type: "reference",
          reference: "vertex-c",
        },
        distance: {
          type: "reference",
          reference: "distance",
        },
        angle: {
          type: "reference",
          reference: "3d-angle",
        },
        fn: (p0, p1, p2, distance, angle) => {
          const xd = findPointAlongLine(p1, p2, distance * 2);

          const xc = findPointAlongLine(xd, p0, distance);

          return xc;
        },
      },
      id: "vertex-b-c",
    },

    {
      valueType: "position",
      valueMakerName: "NormaliseByFunctionPositionMaker",
      params: {
        p0: {
          type: "reference",
          reference: "vertex-a",
        },
        p1: {
          type: "reference",
          reference: "vertex-b",
        },
        p2: {
          // not used
          type: "reference",
          reference: "vertex-c",
        },
        distance: {
          type: "reference",
          reference: "distance",
        },
        angle: {
          type: "reference",
          reference: "3d-angle",
        },
        fn: (p0, p1, p2, distance, angle) => {
          const xd = findPointAlongLine(p2, p0, distance * 2);

          const xc = findPointAlongLine(xd, p1, distance);

          return xc;
        },
      },
      id: "vertex-c-c",
    },

    {
      valueType: "position",
      valueMakerName: "NormaliseByFunctionPositionMaker",
      params: {
        p0: {
          type: "reference",
          reference: "vertex-a",
        },
        p1: {
          type: "reference",
          reference: "vertex-b",
        },

        p2: {
          // not used
          type: "reference",
          reference: "vertex-c",
        },
        distance: {
          type: "reference",
          reference: "distance",
        },
        angle: {
          type: "reference",
          reference: "3d-angle",
        },
        fn: (p0, p1, p2, distance, angle) => {
          console.log({ p0, p1, distance, angle });
          return findPointAtAngleAndDistanceFromLine(p0, p1, distance, angle);
        },
      },
      id: "vertex-a-a",
    },

    {
      valueType: "position",
      valueMakerName: "NormaliseByFunctionPositionMaker",
      params: {
        p0: {
          type: "reference",
          reference: "vertex-b",
        },
        p1: {
          type: "reference",
          reference: "vertex-c",
        },

        p2: {
          // not used
          type: "reference",
          reference: "vertex-a",
        },
        distance: {
          type: "reference",
          reference: "distance",
        },
        angle: {
          type: "reference",
          reference: "3d-angle",
        },
        fn: (p0, p1, p2, distance, angle) => {
          console.log({ p0, p1, distance, angle });
          return findPointAtAngleAndDistanceFromLine(p0, p1, distance, angle);
        },
      },
      id: "vertex-b-a",
    },
  ],
  drawMakers: [
    {
      drawType: "DrawLinker",
      params: {
        p1: {
          type: "reference",
          reference: "vertex-a",
        },
        p2: {
          type: "reference",
          reference: "vertex-c-a",
        },
      },
    },

    {
      drawType: "DrawLinker",
      params: {
        p1: {
          type: "reference",
          reference: "vertex-a-a",
        },
        p2: {
          type: "reference",
          reference: "vertex-b",
        },
      },
    },

    {
      drawType: "DrawLinker",
      params: {
        p1: {
          type: "reference",
          reference: "vertex-b-a",
        },
        p2: {
          type: "reference",
          reference: "vertex-c",
        },
      },
    },

    {
      drawType: "DrawLinker",
      params: {
        p1: {
          type: "reference",
          reference: "vertex-c",
        },
        p2: {
          type: "reference",
          reference: "vertex-a-b",
        },
      },
    },

    {
      drawType: "DrawLinker",
      params: {
        p1: {
          type: "reference",
          reference: "vertex-a",
        },
        p2: {
          type: "reference",
          reference: "vertex-b-b",
        },
      },
    },

    {
      drawType: "DrawLinker",
      params: {
        p1: {
          type: "reference",
          reference: "vertex-b",
        },
        p2: {
          type: "reference",
          reference: "vertex-c-b",
        },
      },
    },

    {
      drawType: "DrawLinker",
      params: {
        p1: {
          type: "reference",
          reference: "vertex-c-b",
        },
        p2: {
          type: "reference",
          reference: "vertex-a-c",
        },
      },
    },

    {
      drawType: "DrawLinker",
      params: {
        p1: {
          type: "reference",
          reference: "vertex-b-b",
        },
        p2: {
          type: "reference",
          reference: "vertex-c-c",
        },
      },
    },

    {
      drawType: "DrawLinker",
      params: {
        p1: {
          type: "reference",
          reference: "vertex-a-b",
        },
        p2: {
          type: "reference",
          reference: "vertex-b-c",
        },
      },
    },

    {
      drawType: "DrawLinker",
      params: {
        p1: {
          type: "reference",
          reference: "vertex-a",
        },
        p2: {
          type: "reference",
          reference: "vertex-a-a",
        },
      },
    },

    {
      drawType: "DrawLinker",
      params: {
        p1: {
          type: "reference",
          reference: "vertex-b",
        },
        p2: {
          type: "reference",
          reference: "vertex-b-a",
        },
      },
    },

    {
      drawType: "DrawLinker",
      params: {
        p1: {
          type: "reference",
          reference: "vertex-c",
        },
        p2: {
          type: "reference",
          reference: "vertex-c-a",
        },
      },
    },

    {
      drawType: "DrawDot",
      params: {
        p1: {
          type: "reference",
          reference: "vertex-a-c",
        },
      },
    },
    {
      drawType: "DrawDot",
      params: {
        p1: {
          type: "reference",
          reference: "vertex-b-c",
        },
      },
    },

    {
      drawType: "DrawDot",
      params: {
        p1: {
          type: "reference",
          reference: "vertex-c-c",
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
