import { ValueJson } from "./AbstractValueMaker";
import { DiscriminatedUnion } from "./ConcreteMap";

describe("Has the correct typings", () => {
  it("Has type errors in the right places", () => {
    const wantsDiscUnion = (array: Array<ValueJson>) => {};
    wantsDiscUnion([
      {
        valueMakerName: "XYPositionMaker",
        params: {
          x: 1,
          y: 1,
          dx: 1,
          dy: {
            type: "reference",
            reference: "hello",
          },
        },
        id: "1123",
        valueType: "foo",
      },
      {
        valueMakerName: "XYPositionMaker",
        params: {
          //@ts-expect-error
          value: 123,
        },
        id: "1123",
        valueType: "foo",
      },
    ]);

    wantsDiscUnion([
      //@ts-expect-error
      {
        valueMakerName: "XYPositionMaker",
        params: {
          x: 1,
          y: 1,

          dy: {
            type: "reference",
            reference: "hello",
          },
        },
        id: "1123",
        valueType: "foo",
      },
    ]);
  });
});
