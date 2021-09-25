import { Algorithm } from "./_Algorithm";

describe("Algorithm Typings", () => {
  describe("has the errors in the right places", () => {
    it("A straight up empty object has type errors", () => {
      //@ts-expect-error
      const a1: Algorithm = {};
    });

    it("Empty arrays are fine", () => {
      const a1: Algorithm = {
        name: "foo",
        modelDefinition: [],
        drawMakers: [],
        controlHints: [],
      };
    });

    it("Bad objects cause errors", () => {
      const a1: Algorithm = {
        name: "foo",
        //@ts-expect-error
        modelDefinition: [{}],
        //@ts-expect-error
        drawMakers: [{}],

        //@ts-expect-error
        controlHints: [{}],
      };
    });

    it("Intellisense should work when creating an object", () => {
      const a1: Algorithm = {
        name: "foo",
        modelDefinition: [
          {
            id: "foo",
            valueType: "number",
            valueMaker: "StaticNumberMaker",
            params: {
              value: 1,
            },
          },
        ],
        drawMakers: [
          {
            drawType: "DrawDot",
            params: {
              p1: {
                x: 1,
                y: 1,
              },
            },
          },
        ],
        controlHints: [
          {
            valueMakerId: "deltaX",
            controlType: "slider",
            params: {
              label: "Delta X",
              min: -1,
              max: 1,
              step: 0.01,
              initialValue: 0.5,
            },
            visible: true,
          },
        ],
      };
    });
  });
});
