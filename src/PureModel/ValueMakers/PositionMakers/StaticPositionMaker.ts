import { Position } from "../../ValueTypes";
import {
  AbstractValueMaker,
  ControlConfigAndUpdateFunction,
  NodeReferenceMap,
  ValueJson,
} from "../AbstractValueMaker";

export type StaticPositionMakerTyping = {
  name: "StaticPositionMaker";
  params: {
    x: number;
    y: number;
  };
  valueType: Position;
};

export class StaticPositionMaker extends AbstractValueMaker<StaticPositionMakerTyping> {
  private value: Position;
  constructor(
    valueJson: ValueJson<StaticPositionMakerTyping["name"]>,
    referenceNodes: NodeReferenceMap<StaticPositionMakerTyping>
  ) {
    super(valueJson, referenceNodes);
    this.value = {
      x: this.lookupValueByKey("x"),
      y: this.lookupValueByKey("y"),
      dx: 0,
      dy: 0,
    };
  }

  updateValue(value: Position) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  getControlConfig(): ControlConfigAndUpdateFunction<StaticPositionMakerTyping>[] {
    return [
      {
        paramKey: "x",
        config: {
          type: "slider",
          id: this.valueJson.id + "-x",
          params: {
            label: this.valueJson.id + "-x",
            min: 0,
            max: 1,
            step: 0.1,
            initialValue: this.value.x,
          },
        },
        updateFn: (value) => {
          this.updateValue({ ...this.value, x: value });
        },
      },
      {
        paramKey: "y",
        config: {
          type: "slider",
          id: this.valueJson.id + "-y",
          params: {
            label: this.valueJson.id + "-y",
            min: 0,
            max: 1,
            step: 0.1,
            initialValue: this.value.y,
          },
        },
        updateFn: (value) => {
          this.updateValue({ ...this.value, y: value });
        },
      },
    ];
  }
}
