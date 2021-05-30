import { partition } from "./partition";

describe("partition", () => {
  it("works", () => {
    const result = partition([1, 2, 3], (v) => v === 1);
    expect(result).toEqual([[1], [2, 3]]);
  });
});
