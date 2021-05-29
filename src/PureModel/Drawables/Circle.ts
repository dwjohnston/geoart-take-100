import { textChangeRangeIsUnchanged } from "typescript";
import { Canvas, IDrawable, Position } from "../AbstractModelItem";
import { adjustPosition, adjustSize } from "./utils";

export class Circle implements IDrawable {


    private color: string; 
    private center: Position; 
    private radius: number; 

   constructor(center: Position, radius: number, color: string) {

    this.color = color; 
    this.center = center; 
    this.radius = radius; 
}
    draw(ctx : Canvas) {

        const context  = ctx.ctx; 

        context.strokeStyle = this.color; 
        context.lineWidth = 2; 

        
        context.beginPath();

        const position = adjustPosition(context, this.center); 
        const size = adjustSize(context, this.radius);
        
        context.moveTo(position.x + size.x, position.y); 
        context.ellipse(position.x, position.y, size.x, size.y, 0, 0, 2 * Math.PI, false);
        context.closePath(); 
        context.stroke();
    }
}