import { Color } from "../../ValueTypes";
import {
  AbstractValueMaker,
  ControlConfigAndUpdateFunction,
  NodeReferenceMap,
  ValueJson,
} from "../AbstractValueMaker";

export type StaticColorMakerTyping = {
  name: "StaticColorMaker";
  params: {
    value: Color;
  };
  valueType: Color;
};

export class StaticColorMaker extends AbstractValueMaker<StaticColorMakerTyping> {
  private value: Color;

  constructor(
    valueJson: ValueJson<StaticColorMakerTyping["name"]>,
    referencedNodes: NodeReferenceMap<StaticColorMakerTyping>
  ) {
    super(valueJson, referencedNodes);
    this.value = this.lookupValueByKey("value");
  }

  updateValue(color: Color) {
    this.value = color;
  }

  getValue() {
    return this.value;
  }

  getControlConfig(): ControlConfigAndUpdateFunction<StaticColorMakerTyping>[] {
    return [
      {
        paramKey: "value",
        config: {
          type: "color-control",
          id: this.valueJson.id,
          params: {
            label: this.valueJson.id,
            initialValue: this.value,
          },
        },
        updateFn: (value) => this.updateValue(value),
      },
    ];
  }
}
