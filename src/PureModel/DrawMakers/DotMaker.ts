import {  IDrawMaker } from "../AbstractModelItem";
import { Circle } from '../Drawables/Circle';
import { Line } from "../Drawables/Line";
import { AbstractValueMaker } from '../ValueMakers/AbstractValueMaker';
import { PossiblePositionMakers } from '../ValueMakers/PositionMakers';

export class DotMaker implements IDrawMaker {
  private p1: AbstractValueMaker<PossiblePositionMakers>;
  constructor(params: {p1: AbstractValueMaker<PossiblePositionMakers>}) {
    const {p1} = params; 
    this.p1 = p1;
  }

  getDrawables() {
    return {
      temp: [
        new Circle(this.p1.getValue(), 0.005, "rgba(255, 0, 0, 1)"),
      ],
      paint: [
        new Circle(this.p1.getValue(), 0.0025, "rgba(255, 230, 230, 0.3)"),

      ],
    };
  }
}
