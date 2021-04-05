import { COLOR_ORBIT_GREY, COLOR_PLANET_DEFAULT } from "../../Contants/colors";
import { SIZE_PLANET } from "../../Contants/sizes";
import {IDrawMaker, Position} from "../AbstractModelItem";
import { Circle } from "../Drawables/Circle";
import { AbstractNumberMaker } from "../ValueMakers/NumberMakers";
import { AbstractPositionMaker, OrbittingPositionMaker } from "../ValueMakers/PositionMakers";

export class PlanetDrawer implements IDrawMaker {



    private _center: AbstractPositionMaker; 
    private   _orbitSize: AbstractNumberMaker; 

    private position: AbstractPositionMaker; 

    constructor(center: AbstractPositionMaker, orbitSize: AbstractNumberMaker, position:  AbstractPositionMaker) {
        this._center = center; 
        this._orbitSize = orbitSize; 
        this.position = position;

    }


    getDrawables() {


        return [
            new Circle(this._center.getPosition(), this._orbitSize.getValue(), COLOR_ORBIT_GREY), 

            new Circle(this.position.getPosition(), SIZE_PLANET, COLOR_PLANET_DEFAULT)
        ];
    }

}
