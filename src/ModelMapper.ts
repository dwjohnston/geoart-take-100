import { ITheWholeModel, IDrawMaker, ITickable, IDrawable, ControlConfigMap } from "./PureModel/AbstractModelItem";
import { PlanetDrawer } from "./PureModel/DrawMakers/PlanetDrawer";
import { LinearMover } from "./PureModel/LinearMover";
import { OrbittingPositionMaker, StaticPositionMaker } from "./PureModel/ValueMakers/PositionMakers";
import {PhasingNumberMaker, StaticNumberMaker, TickingPhasingNumberMaker} from "./PureModel/ValueMakers/NumberMakers";
import { Planet } from "./PureModel/Composites/Planet";
import { Linker } from "./PureModel/DrawMakers/Linker";




const modelMap = {
    "linear-mover": LinearMover, 
    "planet": Planet, 
    "linker": Linker, 
} as const; 


type DefinitionItem<T extends keyof typeof modelMap = keyof typeof modelMap> = {    
    [key in T] : {
    itemKey: T ; 
    props: ConstructorParameters<typeof modelMap[T]>
    }
}[T]

// type PossibleDefinitionItem <T extends keyof typeof modelMap> = {
//     [key in T]: DefinitionItem<key>;
// }[T]; 

type Definition = Array<DefinitionItem>; 



export class TheWholeModel implements TheWholeModel {


    private _drawmakers: IDrawMaker[]  = []; 
    private _tickables: ITickable[] = [];
    private controllers: ControlConfigMap;  

    constructor(tickables: ITickable[], controllers : ControlConfigMap, drawmakers: IDrawMaker[]) {


        this._tickables = tickables; 
        this.controllers = controllers; 
        this._drawmakers = drawmakers; 

    }; 

    tick() {

        this._tickables.forEach((v) => {
            console.log(v);
            v.tick();
        })

        return this._drawmakers.reduce((acc, cur) => {
            return [
                ...acc, 
                ...cur.getDrawables()
            ]; 
        }, [] as IDrawable[]); 
    }


    updateProperty(key: string, value: unknown) {
        
    }


    getControllers() : unknown {
        return ; 
    }

}

/**
 * The thing that is returned from this, needs to: 
 * 
 *  1. Regularly tick the quartz
 *  2. After each tick, retrieve the drawables
 *  3. Declare a list of controllers to put on the FE.  
 *  4. Respond to property update events. 
 * @param definition 
 */
export function createModelFromDefinition(definition: Definition) : TheWholeModel{

    return new TheWholeModel(definition);
    
}


export function getRandomModel() : TheWholeModel {



    const planet1Center = new StaticPositionMaker({x: 0.5, y: 0.5}); 
    const planet2Center =new StaticPositionMaker({x: 0.5, y: 0.5});

    const planet1Speed = new StaticNumberMaker(0.0025, "speed"); 
    const planet1Radius = new StaticNumberMaker(0.15, "radius"); 
    const planet1Phase = new TickingPhasingNumberMaker(0, 1, planet1Speed);

    const planet2Speed = new StaticNumberMaker(0.0035, "speed"); 
    const planet2Radius = new StaticNumberMaker(0.35, "radius"); 
    const planet2Phase = new TickingPhasingNumberMaker(0, 1, planet2Speed);
    

    const planet1Position = new OrbittingPositionMaker(planet1Center, planet1Radius, planet1Speed, planet1Phase); 
    const planet2Position = new OrbittingPositionMaker(planet2Center, planet2Radius, planet2Speed, planet2Phase); 


    const planet1Drawmaker = new PlanetDrawer(planet1Center, planet1Radius, planet1Position);
    const planet2Drawmaker = new PlanetDrawer(planet2Center, planet2Radius, planet2Position);


    const tickables = [
        ...planet1Position.getTickables(), 
        ...planet2Position.getTickables(), 
    ]; 

    const controllers = {
        ...planet1Position.getControls(), 
        ...planet2Position.getControls(), 
    }

    const drawMakers = [ 
        planet1Drawmaker, 
        planet2Drawmaker   
    ]; 


    return new TheWholeModel(tickables, controllers, drawMakers); 
}