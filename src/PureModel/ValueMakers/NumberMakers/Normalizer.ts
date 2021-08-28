import { AbstractValueMaker } from "../AbstractValueMaker";

export type NormalizerTyping = {
  name: "Normalizer";
  params: {
    inputValue: number;
    numerator: number;
    denominator: number;
    offset: number;
  };
  valueType: number;
};

/**
 * Normalizer is a number maker that converts one number into another, in a linear fashion
 * This is useful for converting PI into screen paramters (0-1) for example
 */
export class Normalizer extends AbstractValueMaker<NormalizerTyping> {
  getValue(): number {
    const inputValue = this.lookupValueByKey("inputValue");
    const numerator = this.lookupValueByKey("numerator");
    const denominator = this.lookupValueByKey("denominator");

    const offset = this.lookupValueByKey("offset");

    return inputValue * (numerator / denominator) + offset;
  }
}
