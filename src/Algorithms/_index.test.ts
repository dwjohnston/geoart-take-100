import { getModel } from "../PureModel/ModelEntryPoint";
import * as algoMap from "./_index";

describe("Algorithms", () => {
  it("They all pass an initial parsing", () => {
    expect(() => {
      const algorithms = Object.keys(algoMap);
      algorithms.forEach((v) => {
        getModel(v);
      });
    }).not.toThrow();
  });
});
