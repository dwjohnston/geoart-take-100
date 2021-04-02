import { IControllable, IDrawable, IDrawMaker, ITickable, Position } from "../AbstractModelItem";
import { PlanetDrawer } from "../DrawMakers/PlanetDrawer";
import { AbstractNumberMaker, PhasingNumberMaker, StaticNumberMaker } from "../ValueMakers/NumberMakers";
import { AbstractPositionMaker } from "../ValueMakers/PositionMakers";


export class Planet implements ITickable, IDrawMaker{

    private center: AbstractPositionMaker; 
    private orbitSize: AbstractNumberMaker; 
    private speed: AbstractNumberMaker; 
    private phase: PhasingNumberMaker; 

    private planetDrawer: PlanetDrawer;

    constructor(center: AbstractPositionMaker, speed: AbstractNumberMaker, orbitSize: AbstractNumberMaker) {

        this.center = center; 
        this.speed = speed; 
        this.phase = new PhasingNumberMaker(0, 1); 
        this.orbitSize = orbitSize; 

        this.planetDrawer = new PlanetDrawer(this.center, this.orbitSize, this.phase);
    }; 

    tick() {
        this.phase.increment(this.speed.getValue());
    }

    getDrawables() : IDrawable[] {
        return this.planetDrawer.getDrawables(); 
    }

    



}