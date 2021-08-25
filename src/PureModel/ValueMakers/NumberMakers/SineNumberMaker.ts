import { AbstractValueMaker } from "../AbstractValueMaker";

export type SineNumberMakerTyping = {
  name: "SineNumberMaker";
  params: {
    phase: number;
    amplitude: number;
  };
  valueType: number;
};

export class SineNumberMaker extends AbstractValueMaker<SineNumberMakerTyping> {
  getValue(): number {
    const phase = this.lookupValueByKey("phase");
    const amplitude = this.lookupValueByKey("amplitude");

    return amplitude * Math.sin(phase);
  }
}
