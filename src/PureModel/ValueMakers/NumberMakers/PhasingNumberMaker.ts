import { ITickable } from "../../AbstractModelItem";
import {
  AbstractValueMaker,
  NodeReferenceMap,
  ValueJson,
} from "../AbstractValueMaker";

export type PhasingNumberMakerTyping = {
  name: "PhasingNumberMaker";
  params: {
    initialValue: number;
    max: number;
    step: number;
    valueType: number;
  };
  valueType: number;
};

export class PhasingNumberMaker
  extends AbstractValueMaker<PhasingNumberMakerTyping>
  implements ITickable
{
  private value: number;

  constructor(
    valueJson: ValueJson<PhasingNumberMakerTyping>,
    referencedNodes: NodeReferenceMap<PhasingNumberMakerTyping>
  ) {
    super(valueJson, referencedNodes);

    this.value = this.lookupValueByKey("initialValue");
  }

  increment(step: number) {
    const max = this.lookupValueByKey("max");

    this.value = (this.value + step) % max;
  }

  tick() {
    this.increment(this.lookupValueByKey("step"));
  }

  getValue(): number {
    return this.value;
  }
}
