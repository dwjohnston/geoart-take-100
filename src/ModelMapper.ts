import { ITheWholeModel, IDrawMaker, ITickable, IDrawable } from "./PureModel/AbstractModelItem";
import { Planet } from "./PureModel/DrawMakers/Planet";
import { LinearMover } from "./PureModel/LinearMover";




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
export function createModelFromDefinition(definition: Definition) : ITheWholeModel{

    return new TheWholeModel(definition);
    
}