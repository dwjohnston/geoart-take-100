import { Position } from "../../ValueTypes";
import { AbstractValueMaker } from "../AbstractValueMaker";

export type XYPositionMakerTyping = {
  name: "XYPositionMaker";
  params: {
    x: number;
    y: number;
    dx: number;
    dy: number;
  };
  valueType: Position;
};

export class XYPositionMaker extends AbstractValueMaker<XYPositionMakerTyping> {
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
