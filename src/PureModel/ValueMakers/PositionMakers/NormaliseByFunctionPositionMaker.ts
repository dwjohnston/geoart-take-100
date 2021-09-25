import { FlowNode } from "typescript";
import { getPositionOnCircle } from "../../../Math";
import { Color, Position } from "../../ValueTypes";
import { AbstractValueMaker } from "../AbstractValueMaker";

export type NormaliseByFunctionPositionMakerTyping = {
  name: "NormaliseByFunctionPositionMaker";
  params: {
    // This is clearly specific to one use case.
    // It looks like what we want is some kind 'just get arbitrary values, and pass them into a function' thing
    p0: Position;
    p1: Position;
    p2: Position;
    distance: number;
    angle: number;
    fn: (
      p0: Position,
      p1: Position,
      p2: Position,
      distance: number,
      angle: number,
      p3?: Position
    ) => Position;
  };
  valueType: Position;
};

export class NormaliseByFunctionPositionMaker extends AbstractValueMaker<NormaliseByFunctionPositionMakerTyping> {
  getValue(): Position {
    const p0 = this.lookupValueByKey("p0");
    const p1 = this.lookupValueByKey("p1");
    const p2 = this.lookupValueByKey("p2");

    const distance = this.lookupValueByKey("distance");
    const angle = this.lookupValueByKey("angle");
    const fn = this.lookupValueByKey("fn");

    return fn(p0, p1, p2, distance, angle);
  }
}
