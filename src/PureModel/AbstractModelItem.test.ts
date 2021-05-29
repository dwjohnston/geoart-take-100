import { ValueJson, ValueMakers, ValueMakersMap, checkForCircularDependencies } from "./AbstractModelItem";

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
          reference: "some reference"
        }
      },
      id: "foo",
    });
  });
});


describe("checkForCircularDependencies", () => {

  it ("doesn't error for no circular dependencies", () => {

    // Standard case
    expect(()=> {
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
        }
      ])
    }).not.toThrow();



    // Reference chain case
    expect(()=> {
      checkForCircularDependencies([
        {
          valueType: "position",
          valueMaker: "StaticPositionMaker",
          params: {
            value: {
              type: "reference", 
              reference: "bar"
            }
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
        }
      ])
    }).not.toThrow();


    // Two things referencing the same node (is ok)
    expect(()=> {
      checkForCircularDependencies([
        {
          valueType: "position",
          valueMaker: "StaticPositionMaker",
          params: {
            value: {
              type: "reference", 
              reference: "bar"
            }
          },
          id: "foo",
        },
        {
          valueType: "position",
          valueMaker: "StaticPositionMaker",
          params: {
            value: {
              type: "reference", 
              reference: "bar"
            }
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
        }
      ])
    }).not.toThrow();

  });


  it ("errors if there are circular dependencies", () => {
    // Self reference
    expect(()=> {
      checkForCircularDependencies([
        {
          valueType: "position",
          valueMaker: "StaticPositionMaker",
          params: {
            value: {
              type: "reference", 
              reference: "foo"
            }
          },
          id: "foo",
        },

      ])
    }).toThrow();

    //referenceing each other
    expect(()=> {
      checkForCircularDependencies([
        {
          valueType: "position",
          valueMaker: "StaticPositionMaker",
          params: {
            value: {
              type: "reference", 
              reference: "foo"
            }
          },
          id: "bar",
        },
        {
          valueType: "position",
          valueMaker: "StaticPositionMaker",
          params: {
            value: {
              type: "reference", 
              reference: "bar"
            }
          },
          id: "foo",
        },
      ])
    }).toThrow();
  });
  
  


}); 
