import { NotImplementedError } from "../../Errors/errors";
import {  ControllerMap, ITickable, Position } from "../AbstractModelItem";
import { AbstractNumberMaker, TickingPhasingNumberMaker } from "./NumberMakers";

export class AbstractPositionMaker {
    getPosition(): Position {
        throw new NotImplementedError();
    }

    getControls() : ControllerMap {
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
    private id: string; 


    private phase: TickingPhasingNumberMaker;

    constructor(center: AbstractPositionMaker, radius: AbstractNumberMaker, speed: AbstractNumberMaker, phase: TickingPhasingNumberMaker, id: string) {
        super();
        this.center = center;
        this.radius = radius;
        this.speed = speed;
        this.phase = phase;

        this.id = id; 

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

    getControls(): ControllerMap {

        return {[this.id]: {
            ...this.radius, 
            ...this.speed
        }}
    }
}