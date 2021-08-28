import { COLOR_ORBIT_GREY, COLOR_PLANET_DEFAULT } from "../../Contants/colors";
import { SIZE_PLANET } from "../../Contants/sizes";
import { createOptionalArrayItem } from "../../utils/createOptionalArrayItem";
import { IDrawMaker } from "../AbstractModelItem";
import { Circle } from "../Drawables/Circle";
import { Line } from "../Drawables/Line";
import { Tangent } from "../Drawables/Tangent";
import { colorToString } from "../Drawables/utils";
import { AbstractValueMaker } from "../ValueMakers/AbstractValueMaker";
import { PossibleNumberMakers } from "../ValueMakers/NumberMakers";
import { PossiblePositionMakers } from "../ValueMakers/PositionMakers";
import { Color } from "../ValueTypes";

export class DotMaker implements IDrawMaker {
  private p1: AbstractValueMaker<PossiblePositionMakers>;
  constructor(params: { p1: AbstractValueMaker<PossiblePositionMakers> }) {
    const { p1 } = params;
    this.p1 = p1;
  }

  getDrawables() {
    return {
      temp: [
        //  new Circle(this.p1.getValue(), 0.005, "rgba(255, 0, 0, 1)")
      ],
      paint: [
        new Circle(this.p1.getValue(), 0.0025, "rgba(255, 230, 230, 0.3)"),
      ],
    };
  }
}
