import { COLOR_ORBIT_GREY, COLOR_PLANET_DEFAULT } from "../../Contants/colors";
import { SIZE_PLANET } from "../../Contants/sizes";
import {IDrawMaker, Position} from "../AbstractModelItem";
import { Circle } from "../Drawables/Circle";
import { AbstractNumberMaker } from "../ValueMakers/NumberMakers";
import { AbstractPositionMaker } from "../ValueMakers/PositionMakers";

export class PlanetDrawer implements IDrawMaker {



    private _center: AbstractPositionMaker; 
    private   _orbitSize: AbstractNumberMaker; 
    private _phase : AbstractNumberMaker; 

    constructor(center: AbstractPositionMaker, orbitSize: AbstractNumberMaker, phase:  AbstractNumberMaker) {
        this._center = center; 
        this._orbitSize = orbitSize; 
        this._phase = phase; 
    }


    getDrawables() {
        return [
            new Circle(this._center.getPosition(), this._orbitSize.getValue(), COLOR_ORBIT_GREY), 

            new Circle({
                x: this._center.getPosition().x + (Math.cos((Math.PI * 2 * Math.PI * this._phase.getValue())) * this._orbitSize.getValue()),  
                y: this._center.getPosition().y + (Math.sin((Math.PI * 2 * Math.PI * this._phase.getValue())) * this._orbitSize.getValue()),  
            }, SIZE_PLANET, COLOR_PLANET_DEFAULT)
        ];
    }

}
