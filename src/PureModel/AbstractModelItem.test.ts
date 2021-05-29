import { ValueJson, ValueMakers, ValueMakersMap } from './AbstractModelItem';

function testFunction<TValueMaker extends ValueMakers, TValueType extends ValueMakersMap[TValueMaker]>(value: ValueJson<TValueMaker, TValueType>) {

}


describe("Typings", () => {
    it("They have errors in the right places", () => {


        //Empty object
        //@ts-expect-error
        testFunction({

        });


        // valueType doesn't match the value maker
        testFunction({
            // @ts-expect-error
            valueType: "number",
            valueMaker: "StaticPositionMaker",
            params: {
                value: {
                    x: 1,
                    y: 1,
                }
            },
            id: "foo"
        });

        // params don't fit the position maker.
        testFunction({
            valueType: "position",
            valueMaker: "StaticPositionMaker",
            params: {
                // @ts-expect-error
                value: {
                    y: 1,
                }
            },
            id: "foo"
        });

    });

    it("They don't have errors when things are correct", () => {
        // valueType doesn't match the value maker
        testFunction({
            valueType: "position",
            valueMaker: "StaticPositionMaker",
            params: {
                value: {
                    x: 1,
                    y: 1,
                }
            },
            id: "foo"
        });
    })
})