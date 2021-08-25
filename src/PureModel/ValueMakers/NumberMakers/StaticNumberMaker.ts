import { IControllable } from "../../AbstractModelItem";
import {
  AbstractValueMaker,
  ControlConfigAndUpdateFunction,
  NodeReferenceMap,
  ValueJson,
} from "../AbstractValueMaker";

export type StaticNumberMakerTyping = {
  name: "StaticNumberMaker";
  params: {
    value: number;
  };
  valueType: number;
};

export class StaticNumberMaker
  extends AbstractValueMaker<StaticNumberMakerTyping>
  implements IControllable<number>
{
  private value: number;

  constructor(
    valueJson: ValueJson<StaticNumberMakerTyping["name"]>,
    referencedNodes: NodeReferenceMap<StaticNumberMakerTyping>
  ) {
    super(valueJson, referencedNodes);
    this.value = this.lookupValueByKey("value");
  }

  updateValue(value: number) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  getControlConfig(): ControlConfigAndUpdateFunction<number>[] {
    return [
      // {
      //   config: {
      //     type: "slider",
      //     id: this.valueJson.id,
      //     params: {
      //       label: this.valueJson.id,
      //       min: 0, // Hard code these for now.  It is not up to the logic model to decide what the mins/maxes are. That is a display overlay question.
      //       max: 1, // Unless it kind of does makes sense?
      //       step: 0.01,
      //       initialValue: this.lookupValueByKey("value"),
      //     },
      //   },
      //   updateFn: (value) => this.updateValue(value),
      // },
    ];
  }
}
