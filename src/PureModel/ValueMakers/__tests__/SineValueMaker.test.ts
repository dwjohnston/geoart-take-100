import { SineNumberMaker } from "../NumberMakers";

describe("SineNumberMaker", () => {
  it("produces correct values of sine: 0", () => {
    const valueMaker = new SineNumberMaker(
      {
        id: "sine",
        valueMaker: "SineNumberMaker",
        valueType: "number",
        params: {
          phase: 0,
          amplitude: 1,
        },
      },
      {
        phase: undefined,
        amplitude: undefined,
      }
    );

    const result = valueMaker.getValue();

    expect(result).toBe(0);
  });

  it("produces correct values of sine: 0.5", () => {
    const valueMaker = new SineNumberMaker(
      {
        id: "sine",
        valueMaker: "SineNumberMaker",
        valueType: "number",
        params: {
          phase: Math.PI * 0.5,
          amplitude: 1,
        },
      },
      {
        phase: undefined,
        amplitude: undefined,
      }
    );

    const result = valueMaker.getValue();

    expect(result).toBe(1);
  });
});
