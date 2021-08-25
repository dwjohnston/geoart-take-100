import { getPositionOnCircle } from "../../../Math";
import { Color, Position } from "../../ValueTypes";
import { AbstractValueMaker } from "../AbstractValueMaker";

export type OrbitingPositionMakerTyping = {
  name: "OrbitingPositionMaker";
  params: {
    center: Position;
    radius: number;
    phase: number;
    color: Color;
  };
  valueType: Position;
};

export class OrbitingPositionMaker extends AbstractValueMaker<OrbitingPositionMakerTyping> {
  getValue(): Position {
    const center = this.lookupValueByKey("center");

    const phase = this.lookupValueByKey("phase");
    const radius = this.lookupValueByKey("radius");
    const color = this.lookupValueByKey("color");

    const position = getPositionOnCircle(
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

    return position;
  }
}
