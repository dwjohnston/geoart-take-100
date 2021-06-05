import { ValueReference,ValueMakers, ValueMakersMap, ValueMakersConstructorMap, ValueTypes, NodeValueReference, ModelMap ,IDrawMaker, getValue, getValueMakerFromReferenceNode} from './AbstractModelItem';
import { Linker } from './DrawMakers/Linker'
import { PlanetDrawer } from './DrawMakers/PlanetDrawer'
import { AbstractValueMaker } from './ValueMakers/AbstractValueMaker';
import { AbstractNumberMaker } from './ValueMakers/NumberMakers';
import {AbstractPositionMaker, PossiblePositionMakers} from "./ValueMakers/PositionMakers";


export const DrawMakingMap = {
    "DrawLinker": Linker, 
    "DrawPlanet": PlanetDrawer
}; 

export type PossibleDrawTypes = keyof typeof DrawMakingMap; 

type PossibleAllConstructorParams<T extends keyof typeof DrawMakingMap> = ConstructorParameters<(typeof DrawMakingMap)[T]>; 

type A = PossibleAllConstructorParams<"DrawLinker">; 
type B = A[0];
type PossibleParams<T extends keyof typeof DrawMakingMap> = PossibleAllConstructorParams<T>[0]; 

type C = PossibleParams<"DrawLinker">;

// type C2 = C["p1"]; 

// type C3<T> = T extends AbstractValueMaker<ValueMakers, ValueMakersMap[ValueMakers], any> ? AbstractValueMaker<ValueMakers, ValueMakersMap[ValueMakers], any> : never; 


// type ValueMakerConvertedToAbstractValueMaker <T extends ValueMakers, U> = U extends AbstractValueMaker<T, ValueMakersMap[T], any> ? AbstractValueMaker<T, ValueMakersMap[T], any> : never; 


// type C4 = C3<C2>; 
// type C42  = ValueMakerConvertedToAbstractValueMaker<PossiblePositionMakers, C2>;


// type ExtractGeneric2 <U extends AbstractValueMaker<ValueMakers, ValueMakersMap[ValueMakers], any>> = U extends AbstractValueMaker<infer X, ValueMakersMap[X], any> ? X : never; 

// type D1 = ExtractGeneric2<C42>;

// export type PossibleAbstractValueMakers = AbstractPositionMaker | AbstractNumberMaker; 

// type ValueMakerStringExtractedFromAbstractValueMaker<T extends PossibleAbstractValueMakers>  = T extends AbstractValueMaker<infer X, ValueMakersMap[X], any> ? X : never; 


// type D3 = ValueMakerStringExtractedFromAbstractValueMaker<C42>;


 
// //https://stackoverflow.com/questions/44851268/typescript-how-to-extract-the-generic-parameter-from-a-type
// type ExtractedGeneric<T extends ValueMakers> = AbstractValueMaker<T, ValueMakersMap[T], any> extends AbstractValueMaker<T, infer X, any> ? X : never; 

// // fantastic!
// type D = ExtractedGeneric<PossiblePositionMakers>; 

// type E = ExtractedGeneric<C['p1']>;

// type F = ExtractedGeneric<C3<C2>>; 

// type G = ExtractedGeneric<C42>;

export type AbstractDrawItem<TDrawType extends PossibleDrawTypes = PossibleDrawTypes> = {
    drawType: TDrawType;
    params: {
        [K in keyof PossibleParams<TDrawType>] : NodeValueReference
    }
}; 


export function createDrawMakersFromDrawItems(drawItems: Array<AbstractDrawItem>, modelMap: ModelMap) : Array<IDrawMaker>   {

    const drawMakers = drawItems.map((v) => {

        const entries = Object.entries(v.params) as Array<[string, NodeValueReference]>;

        const params = entries.reduce((acc, [key, value]) => {

            const node = getValueMakerFromReferenceNode(value, modelMap);

            return {
                ...acc, 
                [key]: node
            }
        }, {});

        
        const DrawMakerClass = DrawMakingMap[v.drawType]; 
        // @ts-ignore pretty sure this is fine
        const DrawMaker = new DrawMakerClass(params);

        return DrawMaker;
        
    });


    return drawMakers; 
}
