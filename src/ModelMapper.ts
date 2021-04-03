import { ITheWholeModel, IDrawMaker, ITickable, IDrawable } from "./PureModel/AbstractModelItem";
import { PlanetDrawer } from "./PureModel/DrawMakers/PlanetDrawer";
import { LinearMover } from "./PureModel/LinearMover";
import { StaticPositionMaker } from "./PureModel/ValueMakers/PositionMakers";
import {StaticNumberMaker} from "./PureModel/ValueMakers/NumberMakers";
import { Planet } from "./PureModel/Composites/Planet";




const modelMap = {
    "linear-mover": LinearMover, 
    "planet": Planet
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

    constructor(definition: Definition) {

        definition.forEach((v) => {

            const modelClass = modelMap[v.itemKey];
            const props = v.props; 


            // @ts-ignore - sort this out later. 
            const modelItem = new modelClass(...v.props);

            console.log(modelItem);
            // This should be ok. 
            //@ts-ignore
            if (modelItem.tick) {
                this._tickables.push(modelItem as ITickable); 
            }

            //@ts-ignore
            if (modelItem.getDrawables) {
                this._drawmakers.push(modelItem as IDrawMaker);
            }

        }); 


    }; 

    tick() {

        console.log(this._tickables);

        this._tickables.forEach((v) => {
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

    return createModelFromDefinition([
        {
            itemKey: "planet", 
            props: [new StaticPositionMaker({x: 0.5, y: 0.5}), 
                new StaticNumberMaker(0.0025), 
                new StaticNumberMaker(0.25), 
            ]
        }
    ]); 
}