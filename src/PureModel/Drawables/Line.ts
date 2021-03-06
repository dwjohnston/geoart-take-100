import { Canvas, IDrawable } from "../AbstractModelItem";
import { Position } from "../ValueTypes";
import { adjustPosition, colorToString, isColorPoint } from "./utils";

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

    let p1 = adjustPosition(context, this.p1);
    let p2 = adjustPosition(context, this.p2);

    if (isColorPoint(this.p1) && isColorPoint(this.p2)) {
      const gradient = context.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
      gradient.addColorStop(0, colorToString(this.p1.color));
      gradient.addColorStop(1, colorToString(this.p2.color));
      context.strokeStyle = gradient;
    } else {
      context.strokeStyle = this.color;
    }

    context.lineWidth = 2;

    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.closePath();
    context.stroke();
  }
}
