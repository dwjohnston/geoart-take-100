import { Canvas, IDrawable, Position } from "../AbstractModelItem";
import { adjustPosition } from "./utils";

export class Line implements IDrawable {
  private p1: Position;
  private p2: Position;
  private color: string;
  constructor(p1: Position, p2: Position, color: string) {
    this.p1 = p1;
    this.p2 = p2;
    this.color = color;
  }

  draw(ctx: Canvas) {
    const context = ctx.ctx;

    context.strokeStyle = this.color;

    let p1 = adjustPosition(context, this.p1);
    let p2 = adjustPosition(context, this.p2);

    context.lineWidth = 2;

    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.closePath();
    context.stroke();
  }
}
