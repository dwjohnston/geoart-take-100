import { NotImplementedError } from "../../Errors/errors";
import {
  AbstractControlType,
  ControlConfig,
} from "../../Frontend/Controls/Abstractions";
import { ITickable, Position, ValueJson } from "../AbstractModelItem";
import {
  AbstractValueMaker,
  ControlConfigAndUpdateFunction,
} from "./AbstractValueMaker";
import { AbstractNumberMaker } from "./NumberMakers";

import { v4 as uuid } from "uuid";

export class AbstractPositionMaker<T extends "StaticPositionMaker" | "OrbitingPositionMaker"> extends AbstractValueMaker<T, "position", Position> {}

export class StaticPositionMaker extends AbstractPositionMaker<"StaticPositionMaker"> {
  private value: Position;
  constructor(valueJson: ValueJson<"StaticPositionMaker", "position">) {
    super(valueJson);
    this.value = valueJson.params.value;
  }

  updateValue(value: Position) {
    this.value = value; 
  }

  getValue() {
    return this.value; 
  }


  getControlConfig() : ControlConfigAndUpdateFunction<Position>[] {


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
    ]
  }
}

export class OrbittingPositionMaker
  extends AbstractPositionMaker<"OrbitingPositionMaker">
  implements ITickable
{
  constructor(
    valueJson: ValueJson<"OrbitingPositionMaker", "position">
  ) {
    super(valueJson);

  }

  getValue(): Position {
    return {
      x:
        this.center.getValue().x +
        Math.cos(Math.PI * 2 * Math.PI * this.phase.getValue()) *
          this.radius.getValue(),
      y:
        this.center.getValue().y +
        Math.sin(Math.PI * 2 * Math.PI * this.phase.getValue()) *
          this.radius.getValue(),
    };
  }

  tick() {
    this.phase.tick();
  }

  getTickables(): ITickable[] {
    return [this.phase];
  }

  getControlConfig(): Array<ControlConfigAndUpdateFunction<any>> {
    return [
      ...this.speed.getControlConfig(),
      ...this.radius.getControlConfig(),
    ];
  }
}
