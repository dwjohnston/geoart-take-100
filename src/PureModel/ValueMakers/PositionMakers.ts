import { NotImplementedError } from "../../Errors/errors";
import {
  AbstractControlType,
  ControlConfig,
} from "../../Frontend/Controls/Abstractions";
import {
  ITickable,
  NodeReferenceMap,
  Position,
  ValueJson,
  getValue,
} from "../AbstractModelItem";
import {
  AbstractValueMaker,
  ControlConfigAndUpdateFunction,
} from "./AbstractValueMaker";
import { AbstractNumberMaker } from "./NumberMakers";

import { v4 as uuid } from "uuid";

export type PossiblePositionMakers = "StaticPositionMaker" | "OrbitingPositionMaker"; 

export class AbstractPositionMaker<
  T extends  PossiblePositionMakers = PossiblePositionMakers,
> extends AbstractValueMaker<T, "position", Position> {}

export class StaticPositionMaker extends AbstractPositionMaker<"StaticPositionMaker"> {
  private value: Position;
  constructor(
    valueJson: ValueJson<"StaticPositionMaker", "position">,
    referenceNodes: NodeReferenceMap<
      "StaticPositionMaker",
      "position",
      ValueJson<"StaticPositionMaker", "position">
    >
  ) {
    super(valueJson, referenceNodes);
    this.value = getValue(
      "StaticPositionMaker",
      valueJson,
      referenceNodes,
      "value"
    );
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

export class OrbittingPositionMaker
  extends AbstractPositionMaker<"OrbitingPositionMaker">
  implements ITickable
{
  constructor(
    valueJson: ValueJson<"OrbitingPositionMaker", "position">,
    referenceNodes: NodeReferenceMap<
      "OrbitingPositionMaker",
      "position",
      ValueJson<"OrbitingPositionMaker", "position">
    >
  ) {
    super(valueJson, referenceNodes);
  }

  getValue(): Position {
    const center = getValue(
      "OrbitingPositionMaker",
      this.valueJson,
      this.referencedNodes,
      "center"
    );

    const phase = getValue(
      "StaticNumberMaker",
     //@ts-ignore - I've obviously fucked up, this is wrong.
      this.valueJson,
      this.referencedNodes,
      "phase"
    ) as number;
    //@ts-ignore - I've obviously fucked up, this is wrong.
    const radius = getValue(
      "StaticNumberMaker",
      //@ts-ignore - I've obviously fucked up, this is wrong.
      this.valueJson,
      this.referencedNodes,
      "radius"
    ) as number;

    return {
      x: center.x + Math.cos(Math.PI * 2 * Math.PI * phase) * radius,
      y: center.y + Math.sin(Math.PI * 2 * Math.PI * phase) * radius,
    };
  }

  tick() {
    // Argh, this is fucked.
    //@ts-ignore
    this.referencedNodes.phase.tick();
  }

}
