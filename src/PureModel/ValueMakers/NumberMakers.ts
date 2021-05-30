import { NotImplementedError } from "../../Errors/errors";
import {
  AbstractControlType,
  ControlConfig,
} from "../../Frontend/Controls/Abstractions";
import {
  getValue,
  IControllable,
  ITickable,
  NodeReferenceMap,
  PossibleValueMakersForValueType,
  ValueJson,
  ValueMakers,
} from "../AbstractModelItem";
import {
  AbstractValueMaker,
  ControlConfigAndUpdateFunction,
} from "./AbstractValueMaker";
import { v4 as uuid } from "uuid";

// I need a better way to extract that union type.
export class AbstractNumberMaker<
  T extends "StaticNumberMaker" | "TickingPhaseMaker"
> extends AbstractValueMaker<T, "number", number> {}

export class StaticNumberMaker
  extends AbstractNumberMaker<"StaticNumberMaker">
  implements IControllable<number>
{
  private value: number;

  constructor(
    valueJson: ValueJson<"StaticNumberMaker", "number">,
    referencedNodes: NodeReferenceMap<
      "StaticNumberMaker",
      "number",
      ValueJson<"StaticNumberMaker", "number">
    >
  ) {
    super(valueJson, referencedNodes);
    this.value = getValue(valueJson, referencedNodes, "value");
  }

  updateValue(value: number) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  getControlConfig(): ControlConfigAndUpdateFunction<number>[] {
    return [
      {
        config: {
          type: "slider",
          id: this.valueJson.id,
          params: {
            label: this.valueJson.id,
            min: this.valueJson.params.min,
            max: this.valueJson.params.max,
            step: this.valueJson.params.step,
            initialValue: this.valueJson.params.value,
          },
        },
        updateFn: (value) => this.updateValue(value),
      },
    ];
  }
}

export class PhasingNumberMaker
  extends AbstractNumberMaker<"TickingPhaseMaker">
  implements ITickable
{
  private value: number;

  constructor(
    valueJson: ValueJson<"TickingPhaseMaker", "number">,
    referencedNodes: NodeReferenceMap<
      "TickingPhaseMaker",
      "number",
      ValueJson<"TickingPhaseMaker", "number">
    >
  ) {
    super(valueJson, referencedNodes);

    this.value = getValue(valueJson, referencedNodes, "initialValue");
  }

  increment(value: number) {
    this.value = (this.value + value) % this.valueJson.params.max;
  }

  tick() {
    this.increment(this.valueJson.params.step);
  }

  getValue(): number {
    return this.value;
  }
}

// NOTE: I can't remember why I thought I need two here. Possibly over engineering things.

// export class TickingPhasingNumberMaker
//   extends AbstractNumberMaker
//   implements ITickable {
//   private phaser: PhasingNumberMaker;

//   private step: AbstractNumberMaker;

//   constructor(number = 0, max = 1, step: AbstractNumberMaker) {
//     super();
//     this.phaser = new PhasingNumberMaker(number, max);
//     this.step = step;
//   }

//   tick() {
//     this.phaser.increment(this.step.getValue());
//   }

//   getValue(): number {
//     return this.phaser.getValue();
//   }
// }
