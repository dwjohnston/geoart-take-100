

export type Canvas = {
    
    ctx: CanvasRenderingContext2D; 
}


export type Position =  {
    x: number;  // 0 - 1 
    y: number;  // 0 - 1 
}


/** A drawable object. 
 * 
 * eg. line, square, circle etc. 
 */
export interface IDrawable {
    draw : (ctx: Canvas ) => void; 
}

/** An object that returns a list of Drawables */
export interface IDrawMaker {
    getDrawables: () => IDrawable[]; 
}

/** A an that can respond to ticks */
export interface ITickable  {
    tick: () => void; 
}; 

export interface ITheWholeModel  {

    tick: () =>  IDrawable[]; 
    updateProperty: (key: string, value: unknown) => void; // TODO probably have a tighter definition. 
}


export type ControlConfigItem<TId extends string> = {
    controlType: "slider", 
    id: TId, 
    params: Record<string, unknown>
}

export type ControlConfigMap = {
    [key :string]: ControlConfigItem<string> // This isn't quite right
}; 

export interface IControllable<T> {
    updateValue: (value: T) => void;
    getControlConfig: ControlConfigMap; 
}