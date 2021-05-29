import { createModelFromDefinition } from "./ModelMapper";

describe("ModelMapper", () => {
  it("accepts things of a certain shape", () => {
    const model = createModelFromDefinition([
      {
        itemKey: "planet",
        props: [],
      },
    ]);
  });
});
