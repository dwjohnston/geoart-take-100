import { IDrawable, IDrawMaker, Position } from "../AbstractModelItem";
import { Line } from "../Drawables/Line";
import { AbstractPositionMaker } from "../ValueMakers/PositionMakers";

export class Linker implements IDrawMaker {
  private p1: AbstractPositionMaker;
  private p2: AbstractPositionMaker;
  constructor(params: {p1: AbstractPositionMaker, p2: AbstractPositionMaker}) {
    const {p1, p2} = params; 
    this.p1 = p1;
    this.p2 = p2;
  }

  getDrawables() {
    return {
      temp: [
        new Line(this.p1.getValue(), this.p2.getValue(), "rgba(255, 0, 0, 1)"),
      ],
      paint: [],
    };
  }
}
