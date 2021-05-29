import { AbstractControlId, AbstractControlOutput, AbstractControlType, ControlConfig } from '../Frontend/Controls/Abstractions';
import { ControlConfigAndUpdateFunction } from './ValueMakers/AbstractValueMaker';


export type Canvas = {

    ctx: CanvasRenderingContext2D;
}


export type Position = {
    x: number;  // 0 - 1 
    y: number;  // 0 - 1 
}


/** A drawable object. 
 * 
 * eg. line, square, circle etc. 
 */
export interface IDrawable {
    draw: (ctx: Canvas) => void;
}


/**
 * A package of both temporary drawables and permentant drawables 
 */
export type DrawPackage = {
    temp: IDrawable[];
    paint: IDrawable[];
}

/** An object that returns a list of Drawables */
export interface IDrawMaker {
    getDrawables: () => DrawPackage;
}

/** A object that can respond to ticks */
export interface ITickable {
    tick: () => void;
};

export interface ITheWholeModel {

    tick: () => DrawPackage;
    updateProperty: (value: AbstractControlOutput<AbstractControlId, unknown>) => void; // TODO probably have a tighter definition. 
}

// export type ControllerMap = {
//     [key :string]: IControllable<unknown> | ControllerMap // This isn't quite right
// }; 

export interface IControllable<T> {
    updateValue: (value: T) => void;
    getControlConfig: () => ControlConfigAndUpdateFunction<T>[];
}