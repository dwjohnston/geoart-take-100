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

export class PlanetDrawer implements IDrawMaker {
  private _center: AbstractValueMaker<PossiblePositionMakers>;
  private _orbitSize: AbstractValueMaker<PossibleNumberMakers>;

  private position: AbstractValueMaker<PossiblePositionMakers>;

  constructor(params: {
    center: AbstractValueMaker<PossiblePositionMakers>;
    orbitSize: AbstractValueMaker<PossibleNumberMakers>;
    position: AbstractValueMaker<PossiblePositionMakers>;
  }) {
    const { center, orbitSize, position } = params;
    this._center = center;
    this._orbitSize = orbitSize;
    this.position = position;
  }

  getDrawables(debugMode?: boolean) {
    return {
      temp: [
        new Circle(
          this._center.getValue(),
          this._orbitSize.getValue(),
          COLOR_ORBIT_GREY
        ),
        ...createOptionalArrayItem(
          debugMode,
          new Tangent(this.position.getValue())
        ),
        new Circle(this.position.getValue(), SIZE_PLANET, COLOR_PLANET_DEFAULT),
      ],
      paint: [],
    };
  }
}
