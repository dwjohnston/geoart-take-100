import { getCenterFromTangent } from "../../../Math";
import { Position } from "../../ValueTypes";
import { AbstractValueMaker } from "../AbstractValueMaker";

export type TangentOffsetPositionMakerTyping = {
  name: "TangentOffsetPositionMaker";
  params: {
    tangent: Position;
    radius: number;
  };
  valueType: Position;
  class: TangentOffsetPositionMaker;
};

export class TangentOffsetPositionMaker extends AbstractValueMaker<TangentOffsetPositionMakerTyping> {
  getValue(): Position {
    const tangent = this.lookupValueByKey("tangent");

    const radius = this.lookupValueByKey("radius");

    const center = getCenterFromTangent(tangent, radius);
    return center;
  }
}
