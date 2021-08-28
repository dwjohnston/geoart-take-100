import { ValueJson, ValueMakerTyping } from "./ValueMakers/AbstractValueMaker";
import { AllValueMakerTypings } from "./ValueMakers/ConcreteMap";
import { StaticNumberMaker } from "./ValueMakers/NumberMakers/StaticNumberMaker";
import { StaticPositionMaker } from "./ValueMakers/PositionMakers/StaticPositionMaker";
import { XYPositionMaker } from "./ValueMakers/PositionMakers/XYPositionMaker";
import { checkForCircularDependencies } from "./ValueMakers/_functions/checkForCircularDependencies";
import { constructModelFromJsonArray } from "./ValueMakers/_functions/createModelFromJsonArray";
import { findValueByKey } from "./ValueMakers/_functions/findValueByKey";

function testFunction<TValueMaker extends AllValueMakerTypings>(
  value: ValueJson<TValueMaker["name"]>
) {}

describe("Typings", () => {
  it("They have errors in the right places", () => {
    //Empty object
    //@ts-expect-error
    testFunction({});

    // params don't fit the position maker.
    testFunction({
      valueType: "position",
      valueMakerName: "StaticPositionMaker",

      //@ts-expect-error
      params: {
        x: 0,
      },
      id: "foo",
    });
  });

  it("They don't have errors when things are correct", () => {
    testFunction({
      valueType: "position",
      valueMakerName: "StaticPositionMaker",
      params: {
        x: 1,
        y: 1,
      },
      id: "foo",
    });

    // References are ok too!
    testFunction({
      valueType: "position",
      valueMakerName: "XYPositionMaker",
      params: {
        x: {
          type: "reference",
          reference: "some reference",
        },
        y: 0,
        dx: 0,
        dy: 0,
      },
      id: "foo",
    });
  });
});

describe("checkForCircularDependencies", () => {
  it("doesn't error for no circular dependencies", () => {
    // Standard case
    expect(() => {
      checkForCircularDependencies([
        {
          valueType: "position",
          valueMakerName: "StaticPositionMaker",
          params: {
            value: {
              x: 1,
              y: 1,
              dx: 0,
              dy: 0,
            },
          },
          id: "foo",
        },
        {
          valueType: "position",
          valueMakerName: "StaticPositionMaker",
          params: {
            value: {
              x: 1,
              y: 1,
              dx: 0,
              dy: 0,
            },
          },
          id: "bar",
        },
      ]);
    }).not.toThrow();

    // Reference chain case
    expect(() => {
      checkForCircularDependencies([
        {
          valueType: "position",
          valueMakerName: "StaticPositionMaker",
          params: {
            value: {
              type: "reference",
              reference: "bar",
            },
          },
          id: "foo",
        },
        {
          valueType: "position",
          valueMakerName: "StaticPositionMaker",
          params: {
            value: {
              x: 1,
              y: 1,
              dx: 0,
              dy: 0,
            },
          },
          id: "bar",
        },
      ]);
    }).not.toThrow();

    // Two things referencing the same node (is ok)
    expect(() => {
      checkForCircularDependencies([
        {
          valueType: "position",
          valueMakerName: "StaticPositionMaker",
          params: {
            value: {
              type: "reference",
              reference: "bar",
            },
          },
          id: "foo",
        },
        {
          valueType: "position",
          valueMakerName: "StaticPositionMaker",
          params: {
            value: {
              type: "reference",
              reference: "bar",
            },
          },
          id: "foo2",
        },
        {
          valueType: "position",
          valueMakerName: "StaticPositionMaker",
          params: {
            value: {
              x: 1,
              y: 1,
              dx: 0,
              dy: 0,
            },
          },
          id: "bar",
        },
      ]);
    }).not.toThrow();
  });

  it("errors if there are circular dependencies", () => {
    // Self reference
    expect(() => {
      checkForCircularDependencies([
        {
          valueType: "position",
          valueMakerName: "StaticPositionMaker",
          params: {
            value: {
              type: "reference",
              reference: "foo",
            },
          },
          id: "foo",
        },
      ]);
    }).toThrow();

    //referenceing each other
    expect(() => {
      checkForCircularDependencies([
        {
          valueType: "position",
          valueMakerName: "StaticPositionMaker",
          params: {
            value: {
              type: "reference",
              reference: "foo",
            },
          },
          id: "bar",
        },
        {
          valueType: "position",
          valueMakerName: "StaticPositionMaker",
          params: {
            value: {
              type: "reference",
              reference: "bar",
            },
          },
          id: "foo",
        },
      ]);
    }).toThrow();
  });

  it("Does not throw errors on a more complicated Y shaped model", () => {
    const model = [
      {
        valueType: "number",
        valueMakerName: "StaticNumberMaker",
        params: {
          value: 0.2,
        },
        id: "frequency",
      },

      {
        valueType: "number",
        valueMakerName: "TickingPhaseMaker",
        params: {
          initialValue: 9,
          max: 2 * Math.PI,
          step: {
            type: "reference",
            reference: "frequency",
          },
        },
        id: "phase",
      },

      {
        valueType: "number",
        valueMakerName: "normalizer",
        params: {
          offset: 0,
          ratio: 1 / (Math.PI * 2),
          inputValue: {
            type: "reference",
            reference: "phase",
          },
        },
        id: "x",
      },

      {
        valueType: "number",
        valueMakerName: "SineNumberMaker",
        params: {
          phase: {
            type: "reference",
            reference: "phase",
          },
          amplitude: 0.5,
        },
        id: "y",
      },
      {
        valueType: "position",
        valueMakerName: "XYPositionMaker",
        params: {
          x: {
            type: "reference",
            reference: "x",
          },
          y: {
            type: "reference",
            reference: "y",
          },
        },
        id: "position",
      },
    ];

    expect(() => {
      //@ts-ignore
      checkForCircularDependencies(model);
    }).not.toThrow();
  });

  it("errors if a reference parameter does not exist", () => {
    expect(() => {
      checkForCircularDependencies([
        {
          valueType: "position",
          valueMakerName: "StaticPositionMaker",
          params: {
            value: {
              type: "reference",
              reference: "food",
            },
          },
          id: "bar",
        },
        {
          valueType: "position",
          valueMakerName: "StaticPositionMaker",
          params: {
            value: {
              type: "reference",
              reference: "bar",
            },
          },
          id: "foo",
        },
      ]);
    }).toThrow();
  });
});

describe("constructModelFromJsonArray", () => {
  it("throws an error if there are circular dependencies", () => {
    expect(() => {
      constructModelFromJsonArray([
        {
          valueType: "position",
          valueMakerName: "StaticPositionMaker",
          params: {
            value: {
              type: "reference",
              reference: "foo",
            },
          },
          id: "bar",
        },
        {
          valueType: "position",
          valueMakerName: "StaticPositionMaker",
          params: {
            value: {
              type: "reference",
              reference: "bar",
            },
          },
          id: "foo",
        },
      ]);
    }).toThrow();
  });

  it("finishes processing if there are not circular dependencies", () => {
    expect(() =>
      constructModelFromJsonArray([
        {
          valueType: "position",
          valueMakerName: "StaticPositionMaker",
          params: {
            x: {
              type: "reference",
              reference: "bar",
            },
            y: 1,
          },
          id: "foo",
        },
        {
          valueType: "position",
          valueMakerName: "StaticPositionMaker",
          params: {
            x: {
              type: "reference",
              reference: "bar",
            },
            y: 1,
          },
          id: "foo2",
        },
        {
          valueType: "number",
          valueMakerName: "StaticNumberMaker",
          params: {
            value: 1,
          },
          id: "bar",
        },
      ])
    ).not.toThrow();
  });

  it("Return a map of class instances", () => {
    const result = constructModelFromJsonArray([
      {
        valueType: "position",
        valueMakerName: "XYPositionMaker",
        params: {
          x: {
            type: "reference",
            reference: "bar",
          },
          y: 1,
          dx: 0,
          dy: 0,
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
          y: 1,
          dx: 0,
          dy: 0,
        },
        id: "foo2",
      },
      {
        valueType: "number",
        valueMakerName: "StaticNumberMaker",
        params: {
          value: 1,
        },
        id: "bar",
      },
    ]);

    expect(result["foo"]).toBeInstanceOf(XYPositionMaker);
    expect(result["foo2"]).toBeInstanceOf(XYPositionMaker);
    expect(result["bar"]).toBeInstanceOf(StaticNumberMaker);
  });
});

describe("getValue", () => {
  it("returns the right value for a direct primitive", () => {
    const result = findValueByKey(
      "XYPositionMaker",
      {
        valueType: "position",
        valueMakerName: "XYPositionMaker",
        params: {
          x: 1,
          y: 1,
          dx: 0,
          dy: 0,
        },
        id: "foo",
      },
      {},
      "x"
    );

    expect(result).toEqual(1);
  });

  it("returns the right value for a static refrerence", () => {
    const result = findValueByKey(
      "XYPositionMaker",

      {
        valueType: "position",
        valueMakerName: "XYPositionMaker",
        params: {
          x: {
            type: "static",
            value: 1,
          },
          y: 0,
          dx: 0,
          dy: 0,
        },
        id: "foo",
      },
      { x: undefined },
      "x"
    );

    expect(result).toEqual(1);
  });

  it("returns the right value for a node reference", () => {
    const result = findValueByKey(
      "XYPositionMaker",
      {
        valueType: "position",
        valueMakerName: "XYPositionMaker",
        params: {
          x: {
            type: "reference",
            reference: "bar",
          },
          y: 0,
          dx: 0,
          dy: 0,
        },
        id: "foo",
      },
      {
        x: new StaticPositionMaker(
          {
            id: "bar",
            valueType: "position",
            valueMakerName: "StaticPositionMaker",
            params: {
              x: 2,
              y: 2,
            },
          },
          {}
        ),
      },
      "x"
    );

    expect(result).toEqual({ x: 2, y: 2, dx: 0, dy: 0 });
  });

  it("throws an error if the reference nodes are not available", () => {
    expect(() =>
      findValueByKey(
        "StaticPositionMaker",
        {
          valueType: "position",
          valueMakerName: "StaticPositionMaker",
          params: {
            x: {
              type: "reference",
              reference: "bar",
            },
            y: 1,
          },
          id: "foo",
        },
        {},
        "x"
      )
    ).toThrow();
  });
});
