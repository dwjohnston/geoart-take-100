import { Color, Position } from "../PureModel/AbstractModelItem";

export function getPerpendicularTangent(tangent: Position): Position {
  const { x, y, dx, dy, color } = tangent;
  return {
    x,
    y,
    dx: dy * -1,
    dy: dx,
    color,
  };
}

export function getCenterFromTangent(
  tangent: Position,
  radius: number
): Position {
  const pTangent = getPerpendicularTangent(tangent);

  const { x, y, dx, dy } = pTangent;

  let xOffset = 0,
    yOffset = 0;

  // I hate this.
  // I'm clearly not understanding something about maths.

  if (dx >= 0 && dy >= 0) {
    const angle = Math.atan(dx / dy);
    xOffset = -1 * Math.sin(angle) * radius;
    yOffset = -1 * Math.cos(angle) * radius;
  } else if (dx >= 0 && dy < 0) {
    const angle = Math.atan(dy / dx);
    xOffset = -1 * Math.cos(angle) * radius;
    yOffset = -1 * Math.sin(angle) * radius;
  } else if (dx < 0 && dy >= 0) {
    const angle = Math.atan(dx / dy);
    xOffset = -1 * Math.sin(angle) * radius;
    yOffset = -1 * Math.cos(angle) * radius;
  } else if (dx < 0 && dy < 0) {
    const angle = Math.atan(dy / dx);
    xOffset = Math.cos(angle) * radius;
    yOffset = Math.sin(angle) * radius;
  }

  const center = {
    x: x + xOffset,
    y: y + yOffset,
    dx: 0,
    dy: 0,
  };

  return center;
}

export function getPositionOnCircle(
  center: Position,
  radius: number,
  phase: number,
  color?: Color
): Position {
  const xOffset = Math.cos(Math.PI * 2 * phase) * radius;
  const yOffset = Math.sin(Math.PI * 2 * phase) * radius;

  return {
    x: center.x + xOffset,
    y: center.y + yOffset,
    dx: yOffset * -1,
    dy: xOffset,

    color,
  };
}
