

export type Canvas {
    
    ctx: unknown; 
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