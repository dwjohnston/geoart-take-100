import { Normalizer } from "../NumberMakers/NumberMakers";

describe("Normalizer", () => {
  // (Math.PI * 2)  => 1
  // (Math.PI) = 0.5
  // 0 => 0
  describe("Sine conversions", () => {
    it("Math.PI * 2  -> 1", () => {
      const valueMaker = new Normalizer(
        {
          id: "sine",
          valueMaker: "Normalizer",
          valueType: "number",
          params: {
            numerator: 1,
            denominator: Math.PI * 2,
            inputValue: Math.PI * 2,
            offset: 0,
          },
        },
        {
          numerator: undefined,
          denominator: undefined,
          inputValue: undefined,
          offset: undefined,
        }
      );

      const result = valueMaker.getValue();

      expect(result).toBe(1);
    });

    it("Math.PI  -> 0.5", () => {
      const valueMaker = new Normalizer(
        {
          id: "sine",
          valueMaker: "Normalizer",
          valueType: "number",
          params: {
            numerator: 1,
            denominator: Math.PI * 2,
            inputValue: Math.PI,
            offset: 0,
          },
        },
        {
          numerator: undefined,
          denominator: undefined,
          inputValue: undefined,
          offset: undefined,
        }
      );

      const result = valueMaker.getValue();

      expect(result).toBe(0.5);
    });

    it("0  -> 0", () => {
      const valueMaker = new Normalizer(
        {
          id: "sine",
          valueMaker: "Normalizer",
          valueType: "number",
          params: {
            numerator: 1,
            denominator: Math.PI * 2,
            inputValue: 0,
            offset: 0,
          },
        },
        {
          numerator: undefined,
          denominator: undefined,
          inputValue: undefined,
          offset: undefined,
        }
      );

      const result = valueMaker.getValue();

      expect(result).toBe(0);
    });
  });
});
