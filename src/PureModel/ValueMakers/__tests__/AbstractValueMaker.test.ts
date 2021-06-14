import { AbstractValueMaker } from '../AbstractValueMaker';
import { StaticNumberMaker } from '../NumberMakers';

describe("AbstractValueMaker", () => {
    describe("lookupValueByKey", () => {
        it("if the value key doesn't exist, it throws an error", () => {
            expect(() =>new StaticNumberMaker({
                valueMaker: "StaticNumberMaker",
                valueType: "number",
                params: {
                    value: {
                        type: "reference",
                        reference: "doesnotexist"
                    }
                },
                id: "a"
            }, {
                value: undefined
            })).toThrow();

            
        });
    });
});