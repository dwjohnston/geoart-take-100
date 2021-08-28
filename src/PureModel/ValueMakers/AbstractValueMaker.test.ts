import { PossibleParamValue } from "./AbstractValueMaker";

import { StaticNumberMakerTyping } from "./NumberMakers/StaticNumberMaker";

describe("PossibleParamValueTypes", () => {
  it("has type errors in the right places", () => {
    type A = PossibleParamValue<StaticNumberMakerTyping>;

    const a: A = 9;

    function acceptsNumber(value: number) {}

    // Should be ok.
    acceptsNumber(a);
  });
});
