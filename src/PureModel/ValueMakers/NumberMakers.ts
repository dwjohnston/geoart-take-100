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
    this.value = getValue("StaticNumberMaker",valueJson, referencedNodes, "value");
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
            min: 0, // Hard code these for now.  It is not up to the logic model to decide what the mins/maxes are. That is a display overlay question.
            max: 1, // Unless it kind of does makes sense?
            step: 0.01,
            initialValue: getValue("StaticNumberMaker",this.valueJson, this.referencedNodes, "value"),
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

    this.value = getValue("TickingPhaseMaker",valueJson, referencedNodes, "initialValue");
  }

  increment(value: number) {
    this.value = (this.value + value) % getValue("TickingPhaseMaker",this.valueJson, this.referencedNodes, "max")
  }

  tick() {
    this.increment(getValue("TickingPhaseMaker",this.valueJson, this.referencedNodes, "step"));
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
