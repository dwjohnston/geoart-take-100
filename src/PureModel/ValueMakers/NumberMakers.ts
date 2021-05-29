import { NotImplementedError } from "../../Errors/errors";
import { AbstractControlType, ControlConfig } from '../../Frontend/Controls/Abstractions';
import { IControllable, ITickable } from "../AbstractModelItem";
import { AbstractValueMaker, ControlConfigAndUpdateFunction } from './AbstractValueMaker';
import { v4 as uuid } from 'uuid';

export class AbstractNumberMaker extends AbstractValueMaker<number>{

};


export class StaticNumberMaker extends AbstractNumberMaker implements IControllable<number> {

    private number: number;


    private id: string;

    private min: number;
    private max: number;
    private step: number;
    constructor(value: number, id: string = uuid(), min = 0, max = 1, step = 0.01) {

        super();
        this.number = value;
        this.id = id;

        this.min = min;
        this.max = max;
        this.step = step;
    }


    getValue(): number {
        console.log(this.id,this.number);

        return this.number;
    }

    updateValue(value: number) {

        console.log(this.id, value);
        this.number = value;
    }

    getControlConfig(): ControlConfigAndUpdateFunction<number>[] {


        return [
            {
                config: {
                    type: "slider",
                    id: this.id,
                    params: {
                        label: this.id,
                        min: this.min,
                        max: this.max,
                        step: this.step,
                        initialValue: this.number
                    }
                },
                updateFn: (value) => this.updateValue(value),
            }
        ];
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

    constructor(number = 0, max = 1, step: AbstractNumberMaker) {
        super();
        this.phaser = new PhasingNumberMaker(number, max);
        this.step = step;
    }

    tick() {
        this.phaser.increment(this.step.getValue());
    }

    getValue(): number {
        return this.phaser.getValue();
    }
}

