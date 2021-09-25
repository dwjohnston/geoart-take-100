import { IDrawMaker } from "../AbstractModelItem";
import { Circle } from "../Drawables/Circle";
import { Line } from "../Drawables/Line";

import { AbstractValueMaker } from "../ValueMakers/AbstractValueMaker";
import { PossiblePositionMakers } from "../ValueMakers/PositionMakers";
import { Position } from "../ValueTypes";

export class LineMaker implements IDrawMaker {
  private previous: Position | null;
  private p1: AbstractValueMaker<PossiblePositionMakers>;
  constructor(params: { p1: AbstractValueMaker<PossiblePositionMakers> }) {
    const { p1 } = params;
    this.p1 = p1;

    this.previous = null;
  }

  getDrawables() {
    const currentPosition = this.p1.getValue();

    const ret = {
      paint: [
        this.previous
          ? new Line(this.previous, currentPosition, "rgba(255, 230, 230, 0.3)")
          : new Circle(currentPosition, 0.0025, "rgba(255, 230, 230, 0.3)"),
      ],
      temp: [
        this.previous
          ? new Line(this.previous, currentPosition, "rgba(255, 0, 0, 0.8)")
          : new Circle(currentPosition, 0.0025, "rgba(255, 230, 230, 0.3)"),
      ],
    };

    this.previous = currentPosition;
    return ret;
  }
}
