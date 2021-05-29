import { ITheWholeModel, IDrawMaker, ITickable, IDrawable,   IControllable, DrawPackage } from "./PureModel/AbstractModelItem";
import { PlanetDrawer } from "./PureModel/DrawMakers/PlanetDrawer";
import { LinearMover } from "./PureModel/LinearMover";
import { OrbittingPositionMaker, StaticPositionMaker } from "./PureModel/ValueMakers/PositionMakers";
import {PhasingNumberMaker, StaticNumberMaker, TickingPhasingNumberMaker} from "./PureModel/ValueMakers/NumberMakers";
import { Planet } from "./PureModel/Composites/Planet";
import { Linker } from "./PureModel/DrawMakers/Linker";
import { GeneralError } from "./Errors/errors";
import { AbstractControlId, AbstractControlOutput, AbstractControlOutputValue, AbstractControlType, ControlConfig } from './Frontend/Controls/Abstractions';
import { ControlConfigAndUpdateFunction } from './PureModel/ValueMakers/AbstractValueMaker';




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



export class TheWholeModel implements ITheWholeModel {


    private _drawmakers: IDrawMaker[]  = []; 
    private _tickables: ITickable[] = [];
    private _controlConfigs: ControlConfigAndUpdateFunction<unknown>[];


    private _updateFns : Record<AbstractControlId, (value: AbstractControlOutputValue) => void>  = {}; 


    //private controlFlatMap: Record<string, IControllable<unknown>>; 

    constructor(tickables: ITickable[], controlConfigs: ControlConfigAndUpdateFunction<unknown>[], drawmakers: IDrawMaker[]) {


        this._tickables = tickables; 
        this._controlConfigs = controlConfigs; 
        this._drawmakers = drawmakers; 


        this._updateFns = controlConfigs.reduce((acc, cur) => {
            return {
                ...acc, 
                [cur.config.id]: cur.updateFn
            }
        },{}); 
    }; 

    tick() {

       this._tickables.forEach((v) => {
            v.tick();
        })

        return this._drawmakers.reduce((acc, cur) => {

            const drawPackage = cur.getDrawables();
            return {
                temp: [...acc.temp, ...drawPackage.temp], 
                paint: [...acc.paint, ...drawPackage.paint],
            }; 
        },  {temp: [], paint: []} as DrawPackage); 
    }


    updateProperty(value: AbstractControlOutput<AbstractControlId, unknown>) {
        console.log(value);    
        this._updateFns[value.id](value.value);

    }


    getControlConfigs() : ControlConfigAndUpdateFunction<unknown>[] {
        return this._controlConfigs; 
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
//  */
// export function createModelFromDefinition(definition: Definition) : TheWholeModel{

//     return new TheWholeModel(definition);
    
// }


export function getRandomModel() : TheWholeModel {



    const planet1Center = new StaticPositionMaker({x: 0.5, y: 0.5}); 
    const planet2Center =new StaticPositionMaker({x: 0.5, y: 0.5});

    const planet1Speed = new StaticNumberMaker(0.0025, "p1-speed"); 
    const planet1Radius = new StaticNumberMaker(0.15, "p1-radius"); 
    const planet1Phase = new TickingPhasingNumberMaker(0, 1, planet1Speed);

    const planet2Speed = new StaticNumberMaker(0.0035, "p2-speed"); 
    const planet2Radius = new StaticNumberMaker(0.35, "p2-radius"); 
    const planet2Phase = new TickingPhasingNumberMaker(0, 1, planet2Speed);
    

    const planet1Position = new OrbittingPositionMaker(planet1Center, planet1Radius, planet1Speed, planet1Phase, "planet1"); 
    const planet2Position = new OrbittingPositionMaker(planet2Center, planet2Radius, planet2Speed, planet2Phase, "planet2"); 


    const planet1Drawmaker = new PlanetDrawer(planet1Center, planet1Radius, planet1Position);
    const planet2Drawmaker = new PlanetDrawer(planet2Center, planet2Radius, planet2Position);
    const linker = new Linker(planet1Position, planet2Position);


    const tickables = [
        ...planet1Position.getTickables(), 
        ...planet2Position.getTickables(), 
    ]; 

    const controlConfigs = [
        ...planet1Position.getControlConfig(), 
        ...planet2Position.getControlConfig(), 
    ]

    const drawMakers = [ 
        planet1Drawmaker, 
        planet2Drawmaker, 
        linker
    ]; 


    return new TheWholeModel(tickables, controlConfigs, drawMakers); 
}