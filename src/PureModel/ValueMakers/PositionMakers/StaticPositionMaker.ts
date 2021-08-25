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
    value: Position;
  };
  valueType: Position;
  class: StaticPositionMaker;
};

export class StaticPositionMaker extends AbstractValueMaker<StaticPositionMakerTyping> {
  private value: Position;
  constructor(
    valueJson: ValueJson<StaticPositionMakerTyping["name"]>,
    referenceNodes: NodeReferenceMap<StaticPositionMakerTyping>
  ) {
    super(valueJson, referenceNodes);
    this.value = this.lookupValueByKey("value");
  }

  updateValue(value: Position) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  getControlConfig(): ControlConfigAndUpdateFunction<Position>[] {
    // Typings aren't quite right here.
    // The control config should be allowed to be anything.

    return [
      // {
      //   config: {
      //     type: "slider",
      //     id: this.valueJson.id,
      //     params: {
      //       label: this.valueJson.id+'-x',
      //       min: 0,
      //       max: 1,
      //       step: 0.1,
      //       initialValue: this.valueJson.params.value.x
      //     },
      //   },
      //   updateFn: (value) => this.updateValue({...this.value, x: value}),
      // },
      // {
      //   config: {
      //     type: "slider",
      //     id: this.valueJson.id,
      //     params: {
      //       label: this.valueJson.id+'-y',
      //       min: 0,
      //       max: 1,
      //       step: 0.1,
      //       initialValue: this.valueJson.params.value.x
      //     },
      //   },
      //   updateFn: (value) => this.updateValue({...this.value, y: value}),      },
    ];
  }
}
