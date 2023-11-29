import { XYPair } from "../model/ballBounce";

export type ColorPoint = {
  x: number;
  y: number;
  color: string;
};

export function drawCircle(
  ctx: CanvasRenderingContext2D,
  point: ColorPoint,
  size: XYPair
) {
  ctx.strokeStyle = point.color;
  ctx.beginPath();
  ctx.ellipse(point.x, point.y, size.x, size.y, 0, 0, 2 * Math.PI);
  ctx.stroke();
}

export function drawLine(
  ctx: CanvasRenderingContext2D,
  from: ColorPoint,
  to: ColorPoint
) {
  const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);

  // Add three color stops
  gradient.addColorStop(0, from.color);
  gradient.addColorStop(1, to.color);

  ctx.strokeStyle = gradient;

  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
}
