import {
  AbstractDrawItem,
  createDrawMakersFromDrawItems,
} from "./AbstractDrawItem";
import { constructModelFromJsonArray } from "./ValueMakers/_functions/createModelFromJsonArray";
import { Linker } from "./DrawMakers/Linker";
import { PlanetDrawer } from "./DrawMakers/PlanetDrawer";

describe("createDrawMakersFromDrawItems", () => {
  const modelMap = constructModelFromJsonArray([
    {
      valueType: "position",
      valueMakerName: "XYPositionMaker",
      params: {
        x: {
          type: "reference",
          reference: "bar",
        },
        y: 0,
      },
      id: "foo",
    },
    {
      valueType: "position",
      valueMakerName: "XYPositionMaker",
      params: {
        x: {
          type: "reference",
          reference: "bar",
        },
        y: 0,
      },
      id: "foo2",
    },
    {
      valueType: "number",
      valueMakerName: "StaticNumberMaker",
      params: {
        value: {
          value: 1,
        },
      },
      id: "bar",
    },
  ]);

  it("returns a list of draw maker class instances", () => {
    /**
     * TODO - fix the typings so that they'll fail if reference type is wrong!
     */
    const drawItems: Array<AbstractDrawItem> = [
      {
        drawType: "DrawLinker",
        params: {
          p1: {
            type: "reference",
            reference: "foo",
          },
          p2: {
            type: "reference",
            reference: "foo2",
          },
        },
      },
      {
        drawType: "DrawPlanet",
        params: {
          center: {
            type: "reference",
            reference: "foo",
          },
          orbitSize: {
            type: "reference",
            reference: "bar",
          },
          position: {
            type: "reference",
            reference: "foo2",
          },
        },
      },
    ];

    const result = createDrawMakersFromDrawItems(drawItems, modelMap);

    expect(result).toHaveLength(2);
    expect(result[0]).toBeInstanceOf(Linker);
    expect(result[1]).toBeInstanceOf(PlanetDrawer);
  });

  it("throws an error if a reference node doesn't exist", () => {
    const drawItems: Array<AbstractDrawItem> = [
      {
        drawType: "DrawLinker",
        params: {
          p1: "foo",
          p2: "foo2",
        },
      },
      {
        drawType: "DrawPlanet",
        params: {
          center: "foo",
          orbitSize: "bar",
          position: "foasdasdwasdo2",
        },
      },
    ];

    expect(() => createDrawMakersFromDrawItems(drawItems, modelMap)).toThrow();
  });

  it.todo("Expect type errors if not all params are defined");

  it.todo("Throw errors if not all params are defined/are defined wrong");
});
