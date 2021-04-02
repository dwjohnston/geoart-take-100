import { NotImplementedError } from "../../Errors/errors";
import { Position } from "../AbstractModelItem";

export class AbstractPositionMaker  { 
    getPosition()  :  Position {
        throw new NotImplementedError();
    }
}

export class StaticPositionMaker extends AbstractPositionMaker {


    private position; 
    constructor(position: Position) {
        super(); 

        this.position = position; 
    }


    getPosition() : Position {
        return this.position; 
    }
}