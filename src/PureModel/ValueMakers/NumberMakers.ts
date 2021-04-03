import { NotImplementedError } from "../../Errors/errors";

export class AbstractNumberMaker {

    getValue() : number{
        throw new NotImplementedError();
    }
}


export class StaticNumberMaker extends AbstractNumberMaker {

    private number: number; 
    constructor(value: number) {

        super();
        this.number = value; 
    }


    getValue() : number {
        return this.number; 
    }
}


export class PhasingNumberMaker  extends AbstractNumberMaker {

    private number: number; 
    private max: number; 

    constructor(number = 0, max = 1) {
        super(); 

        this. number = 0; 
        this.max = 1; 
    }

    increment(value: number) {
        this.number = (this.number + value) % this.max; 
    }

    getValue() : number {
        return this.number; 
    }
}