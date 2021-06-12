import {  IDrawMaker } from "../AbstractModelItem";
import { Line } from "../Drawables/Line";
import { AbstractValueMaker } from '../ValueMakers/AbstractValueMaker';
import { PossiblePositionMakers } from '../ValueMakers/PositionMakers';

export class Linker implements IDrawMaker {
  private p1: AbstractValueMaker<PossiblePositionMakers>;
  private p2: AbstractValueMaker<PossiblePositionMakers>;
  constructor(params: {p1: AbstractValueMaker<PossiblePositionMakers>, p2: AbstractValueMaker<PossiblePositionMakers>}) {
    const {p1, p2} = params; 
    this.p1 = p1;
    this.p2 = p2;
  }

  getDrawables() {
    return {
      temp: [
        new Line(this.p1.getValue(), this.p2.getValue(), "rgba(255, 0, 0, 1)"),
      ],
      paint: [
        new Line(this.p1.getValue(), this.p2.getValue(), "rgba(100, 150, 255, 0.2)"),
      ],
    };
  }
}
