import { StaticNumberMaker } from "./NumberMakers/StaticNumberMaker";

describe("AbstractValueMaker", () => {
  describe("lookupValueByKey", () => {
    it("if the value key doesn't exist, it throws an error", () => {
      expect(
        () =>
          new StaticNumberMaker(
            {
              valueMakerName: "StaticNumberMaker",
              valueType: "number",
              params: {
                value: {
                  type: "reference",
                  reference: "doesnotexist",
                },
              },
              id: "a",
            },
            {
              value: undefined,
            }
          )
      ).toThrow();
    });
  });
});
