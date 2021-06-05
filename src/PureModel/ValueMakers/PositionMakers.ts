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
  findValueByKey,
} from "../AbstractModelItem";
import {
  AbstractValueMaker,
  ControlConfigAndUpdateFunction,
} from "./AbstractValueMaker";
import { v4 as uuid } from "uuid";

export type PossiblePositionMakers = "StaticPositionMaker" | "OrbitingPositionMaker";
export class StaticPositionMaker extends AbstractValueMaker<"StaticPositionMaker"> {
  private value: Position;
  constructor(
    valueJson: ValueJson<"StaticPositionMaker">,
    referenceNodes: NodeReferenceMap<
      "StaticPositionMaker",
      ValueJson<"StaticPositionMaker">
    >
  ) {
    super(valueJson, referenceNodes);
    this.value = findValueByKey(
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
  extends AbstractValueMaker<"OrbitingPositionMaker">
{

  
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    valueJson: ValueJson<"OrbitingPositionMaker">,
    referenceNodes: NodeReferenceMap<
      "OrbitingPositionMaker",
      ValueJson<"OrbitingPositionMaker">
    >
  ) {
    super(valueJson, referenceNodes);
  }

  getValue(): Position {
    const center = findValueByKey(
      "OrbitingPositionMaker",
      this.valueJson,
      this.referencedNodes,
      "center"
    );

    const phase = findValueByKey(
      "StaticNumberMaker",
      //@ts-ignore - I've obviously fucked up, this is wrong.
      this.valueJson,
      this.referencedNodes,
      "phase"
    ) as number;
    //@ts-ignore - I've obviously fucked up, this is wrong.
    const radius = findValueByKey(
      "StaticNumberMaker",
      //@ts-ignore - I've obviously fucked up, this is wrong.
      this.valueJson,
      this.referencedNodes,
      "radius"
    ) as number;

    return {
      x: center.x + Math.cos(Math.PI * 2 * phase) * radius,
      y: center.y + Math.sin(Math.PI * 2 * phase) * radius,
    };
  }
}
