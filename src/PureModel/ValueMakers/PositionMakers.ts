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
  Color,
} from "../AbstractModelItem";
import {
  AbstractValueMaker,
  ControlConfigAndUpdateFunction,
} from "./AbstractValueMaker";
import { v4 as uuid } from "uuid";
import { getCenterFromTangent, getPositionOnCircle } from "../../Math";
import { createImportSpecifier } from "typescript";

export type PossiblePositionMakers =
  | "StaticPositionMaker"
  | "OrbitingPositionMaker"
  | "XYPositionMaker"
  | "RollingBallPositionMaker";
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

export class OrbittingPositionMaker extends AbstractValueMaker<"OrbitingPositionMaker"> {
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

    const color = findValueByKey(
      "StaticColorMaker",
      //@ts-ignore
      this.valueJson,
      this.referencedNodes,
      "color"
    ) as unknown as Color | null;

    return getPositionOnCircle(
      center,
      radius,
      phase,
      color || {
        r: 255,
        g: 255,
        b: 255,
        a: 1,
      }
    );
  }
}

export class XYPositionMaker extends AbstractValueMaker<"XYPositionMaker"> {
  getValue(): Position {
    const x = this.lookupValueByKey("x");
    const y = this.lookupValueByKey("y");
    const dx = this.lookupValueByKey("dx");
    const dy = this.lookupValueByKey("dy");

    return {
      x,
      y,
      dx,
      dy,
    };
  }
}

export class RollingBallPositionMaker extends AbstractValueMaker<"RollingBallPositionMaker"> {
  getValue(): Position {
    const tangent = findValueByKey(
      "RollingBallPositionMaker",
      this.valueJson,
      this.referencedNodes,
      "tangent"
    );

    const radius = findValueByKey(
      "RollingBallPositionMaker",
      this.valueJson,
      this.referencedNodes,
      "radius"
    );

    const phase = findValueByKey(
      "RollingBallPositionMaker",
      this.valueJson,
      this.referencedNodes,
      "phase"
    );

    const drawDistance = findValueByKey(
      "RollingBallPositionMaker",
      this.valueJson,
      this.referencedNodes,
      "drawDistance"
    );

    console.log(tangent);

    const center = getCenterFromTangent(tangent, radius);

    const drawPosition = getPositionOnCircle(center, drawDistance, phase);

    console.log({ tangent, center, drawPosition });

    return drawPosition;
  }
}
