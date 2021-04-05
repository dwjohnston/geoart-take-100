import { NotImplementedError } from "../../Errors/errors";
import { ControlConfig, ControlConfigMap, ITickable } from "../AbstractModelItem";

export class AbstractNumberMaker {

    getValue(): number {
        throw new NotImplementedError();
    }

    getControls(): ControlConfig {
        throw new NotImplementedError();
    }
}


export class StaticNumberMaker extends AbstractNumberMaker {

    private number: number;


    private id: string;

    private min: number;
    private max: number;
    private step: number;
    constructor(value: number, id: string, min = 0, max = 1, step = 0.01) {

        super();
        this.number = value;
        this.id = id;

        this.min = min;
        this.max = max;
        this.step = step;
    }


    getValue(): number {
        return this.number;
    }

    getControls(): ControlConfigMap {
        return {
            [this.id]: {
                controlType: "slider",
                id: this.id,
                params: {
                    min: this.min,
                    max: this.max,
                    step: this.step,
                    initialValue: this.number
                }
            }
        }
    }
}


export class PhasingNumberMaker extends AbstractNumberMaker {

    private number: number;
    private max: number;

    constructor(number = 0, max = 1) {
        super();

        this.number = 0;
        this.max = 1;
    }

    increment(value: number) {
        this.number = (this.number + value) % this.max;
    }

    getValue(): number {
        return this.number;
    }
}


export class TickingPhasingNumberMaker extends AbstractNumberMaker implements ITickable {


    private phaser: PhasingNumberMaker; 

    private step: AbstractNumberMaker; 

    constructor(number = 0, max =1, step: AbstractNumberMaker) {
        super();
        this.phaser = new PhasingNumberMaker(number, max); 
        this.step = step; 
    }

    tick() {
        this.phaser.increment(this.step.getValue()); 
    }

    getValue() : number {
        return this.phaser.getValue(); 
    }
}

