import {
  findValueByKey,
  ValueJson,
  ValueMakers,
  ValueMakersMap,
  checkForCircularDependencies,
  constructModelFromJsonArray,
} from "./AbstractModelItem";
import { StaticNumberMaker } from "./ValueMakers/NumberMakers";
import { StaticPositionMaker } from "./ValueMakers/PositionMakers";

function testFunction<
  TValueMaker extends ValueMakers,
  TValueType extends ValueMakersMap[TValueMaker]
>(value: ValueJson<TValueMaker, TValueType>) {}

describe("Typings", () => {
  it("They have errors in the right places", () => {
    //Empty object
    //@ts-expect-error
    testFunction({});

    // valueType doesn't match the value maker
    testFunction({
      // @ts-expect-error
      valueType: "number",
      valueMaker: "StaticPositionMaker",
      params: {
        value: {
          x: 1,
          y: 1,
        },
      },
      id: "foo",
    });

    // params don't fit the position maker.
    testFunction({
      valueType: "position",
      valueMaker: "StaticPositionMaker",
      params: {
        // @ts-expect-error
        value: {
          y: 1,
        },
      },
      id: "foo",
    });
  });

  it("They don't have errors when things are correct", () => {
    testFunction({
      valueType: "position",
      valueMaker: "StaticPositionMaker",
      params: {
        value: {
          x: 1,
          y: 1,
        },
      },
      id: "foo",
    });

    // References are ok too!
    testFunction({
      valueType: "position",
      valueMaker: "StaticPositionMaker",
      params: {
        value: {
          type: "reference",
          reference: "some reference",
        },
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
          valueMaker: "StaticPositionMaker",
          params: {
            value: {
              x: 1,
              y: 1,
            },
          },
          id: "foo",
        },
        {
          valueType: "position",
          valueMaker: "StaticPositionMaker",
          params: {
            value: {
              x: 1,
              y: 1,
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
          valueMaker: "StaticPositionMaker",
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
          valueMaker: "StaticPositionMaker",
          params: {
            value: {
              x: 1,
              y: 1,
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
          valueMaker: "StaticPositionMaker",
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
          valueMaker: "StaticPositionMaker",
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
          valueMaker: "StaticPositionMaker",
          params: {
            value: {
              x: 1,
              y: 1,
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
          valueMaker: "StaticPositionMaker",
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
          valueMaker: "StaticPositionMaker",
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
          valueMaker: "StaticPositionMaker",
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


  it ("errors if a reference parameter does not exist", () => {
    expect(() => {
      checkForCircularDependencies([
        {
          valueType: "position",
          valueMaker: "StaticPositionMaker",
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
          valueMaker: "StaticPositionMaker",
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
          valueMaker: "StaticPositionMaker",
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
          valueMaker: "StaticPositionMaker",
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
          valueMaker: "StaticPositionMaker",
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
          valueMaker: "StaticPositionMaker",
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
          valueMaker: "StaticPositionMaker",
          params: {
            value: {
              x: 1,
              y: 1,
            },
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
        valueMaker: "StaticPositionMaker",
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
        valueMaker: "StaticPositionMaker",
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
        valueMaker: "StaticPositionMaker",
        params: {
          value: {
            x: 1,
            y: 1,
          },
        },
        id: "bar",
      },
    ]);

    expect(result["foo"]).toBeInstanceOf(StaticPositionMaker); 
    expect(result["foo2"]).toBeInstanceOf(StaticPositionMaker); 
    expect(result["bar"]).toBeInstanceOf(StaticPositionMaker); 
  });
});

describe("getValue", () => {
  it("returns the right value for a direct primitive", () => {
    const result = findValueByKey(
      "StaticPositionMaker",
      {
        valueType: "position",
        valueMaker: "StaticPositionMaker",
        params: {
          value: { x: 1, y: 1 },
        },
        id: "foo",
      },
      { value: undefined },
      "value"
    );

    expect(result).toEqual({ x: 1, y: 1 });
  });

  it("returns the right value for a static refrerence", () => {
    const result = findValueByKey(
      "StaticPositionMaker",
      {
        valueType: "position",
        valueMaker: "StaticPositionMaker",
        params: {
          value: {
            type: "static",
            value: { x: 1, y: 1 },
          },
        },
        id: "foo",
      },
      { value: undefined },
      "value"
    );

    expect(result).toEqual({ x: 1, y: 1 });
  });

  it("returns the right value for a node reference", () => {
    const result = findValueByKey(
      "StaticPositionMaker",
      {
        valueType: "position",
        valueMaker: "StaticPositionMaker",
        params: {
          value: {
            type: "reference",
            reference: "bar",
          },
        },
        id: "foo",
      },
      {
        value: new StaticPositionMaker(
          {
            id: "bar",
            valueType: "position",
            valueMaker: "StaticPositionMaker",
            params: {
              value: {
                x: 2,
                y: 2,
              },
            },
          },
          {
            value: undefined,
          }
        ),
      },
      "value"
    );

    expect(result).toEqual({ x: 2, y: 2 });
  });

  it("throws an error if the reference nodes are not available", () => {
    expect(() =>
      findValueByKey(
        "StaticPositionMaker",
        {
          valueType: "position",
          valueMaker: "StaticPositionMaker",
          params: {
            value: {
              type: "reference",
              reference: "bar",
            },
          },
          id: "foo",
        },
        //@ts-expect-error
        {},
        "value"
      )
    ).toThrow();
  });
});
