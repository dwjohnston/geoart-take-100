import { NotImplementedError } from "../../Errors/errors";
import {  ControlConfigMap, ITickable, Position } from "../AbstractModelItem";
import { AbstractNumberMaker, TickingPhasingNumberMaker } from "./NumberMakers";

export class AbstractPositionMaker {
    getPosition(): Position {
        throw new NotImplementedError();
    }

    getControls() : ControlConfigMap {
        throw new NotImplementedError();
    }


    getTickables() : ITickable[] {
        throw new NotImplementedError();
    }
}

export class StaticPositionMaker extends AbstractPositionMaker {


    private position: Position;
    constructor(position: Position) {
        super();

        this.position = position;
    }


    getPosition(): Position {
        return this.position;
    }

    getTickables() : ITickable[] {
        return []; 
    }
}

export class OrbittingPositionMaker extends AbstractPositionMaker implements ITickable {

    private center: AbstractPositionMaker;


    private radius: AbstractNumberMaker;
    private speed: AbstractNumberMaker;


    private phase: TickingPhasingNumberMaker;

    constructor(center: AbstractPositionMaker, radius: AbstractNumberMaker, speed: AbstractNumberMaker, phase: TickingPhasingNumberMaker) {
        super();
        this.center = center;
        this.radius = radius;
        this.speed = speed;
        this.phase = phase;

    }


    getPosition(): Position {
        return {
            x: this.center.getPosition().x + (Math.cos((Math.PI * 2 * Math.PI * this.phase.getValue())) * this.radius.getValue()),
            y: this.center.getPosition().y + (Math.sin((Math.PI * 2 * Math.PI * this.phase.getValue())) * this.radius.getValue()),

        }
    }

    tick() {
        this.phase.tick();
    }


    getTickables() : ITickable[] {
        return [
            this.phase
        ];
    }    

    getControls(): ControlConfigMap {

        return {
            ...this.radius.getControls(), 
            ...this.speed.getControls()
        }
    }
}