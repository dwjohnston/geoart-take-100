import {IDrawMaker} from "../AbstractModelItem";
import { Circle } from "../Drawables/Circle";

export class Planet implements IDrawMaker {

    constructor() {
        
    }

    getDrawables() {
        return [new Circle()];
    }

}