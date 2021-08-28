import { Canvas, IDrawable } from "../AbstractModelItem";
import { Position } from "../ValueTypes";
import { adjustPosition, colorToString, isColorPoint } from "./utils";

// This is more for debugging
export class Tangent implements IDrawable {
  private p1: Position;

  constructor(p1: Position) {
    this.p1 = p1;
  }

  draw(ctx: Canvas) {
    const context = ctx.ctx;

    let p1 = adjustPosition(context, this.p1);
    let p2 = adjustPosition(context, {
      x: this.p1.x + this.p1.dx,
      y: this.p1.y + this.p1.dy,
      dx: 0,
      dy: 0,
    });

    const gradient = context.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
    gradient.addColorStop(0, colorToString("white"));
    gradient.addColorStop(1, colorToString("black"));
    context.strokeStyle = gradient;

    context.lineWidth = 2;

    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.closePath();
    context.stroke();
  }
}
