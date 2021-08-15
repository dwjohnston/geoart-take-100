import { Color, Position } from "../AbstractModelItem";

export function adjustX(context: CanvasRenderingContext2D, value: number) {
  let sizeX = context.canvas.width;
  return sizeX * value;
}

export function adjustY(context: CanvasRenderingContext2D, value: number) {
  let sizeY = context.canvas.height;
  return sizeY * value;
}

export function adjustSize(
  context: CanvasRenderingContext2D,
  size: number
): Position {
  return { x: adjustX(context, size), y: adjustY(context, size) };
}

export function adjustPosition(
  context: CanvasRenderingContext2D,
  position: Position
): Position {
  return { x: adjustX(context, position.x), y: adjustY(context, position.y) };
}

export function colorToString(color: Color): string {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
}

/**
 * Check if a Position definitely has color
 * @param ;
 * @returns
 */
export function isColorPoint(position: Position): position is Position & {
  color: Color;
} {
  return !!position.color;
}
