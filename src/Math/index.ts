import { Color, Position } from "../PureModel/AbstractModelItem";

export function getPerpendicularTangent(tangent: Position): Position {
  const { x, y, dx, dy, color } = tangent;
  return {
    x,
    y,
    dy: dx,
    dx: dy * -1,
    color,
  };
}

export function getCenterFromTangent(
  tangent: Position,
  radius: number
): Position {
  const pTangent = getPerpendicularTangent(tangent);

  const { x, y, dx, dy } = pTangent;
  const angle = Math.atan(dx / dy);

  const xOffset = Math.sin(angle) * radius;
  const yOffset = Math.cos(angle) * radius;

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
