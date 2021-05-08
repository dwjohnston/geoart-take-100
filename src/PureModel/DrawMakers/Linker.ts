import { IDrawable, IDrawMaker, Position } from "../AbstractModelItem";
import { Line } from "../Drawables/Line";
import { AbstractPositionMaker } from "../ValueMakers/PositionMakers";

export class Linker implements IDrawMaker {


    private p1: AbstractPositionMaker; 
    private p2: AbstractPositionMaker; 
    constructor(p1: AbstractPositionMaker, p2: AbstractPositionMaker) {
        this.p1 = p1; 
        this.p2 = p2; 
    }

    getDrawables(): IDrawable[] {

P        return [new Line(this.p1.getPosition(), this.p2.getPosition(), "rgba(255, 0, 0, 1)")]; 

    }
}