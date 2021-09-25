import { SineNumberMaker } from "../PureModel/ValueMakers/NumberMakers/SineNumberMaker";
import { Color, Position } from "../PureModel/ValueTypes";

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

//https://stackoverflow.com/questions/2259476/rotating-a-point-about-another-point-2d
export function rotatePointAboutPoint(
  pivot: Position,
  point: Position,
  angle: number
): Position {
  // const s = Math.sin(angle);
  // const c = Math.cos(angle);

  // const origin = {
  //   x: point.x - pivot.x,
  //   y: point.y - pivot.y,
  // };

  // const newPoint = {
  //   x: origin.x * c - origin.y * s,
  //   y: origin.x * s - origin.y * c,
  // }

  // return {
  //   ...point,
  //   x: newPoint.x + pivot.x,
  //   y: newPoint.y + pivot.y
  // }

  console.log({ pivot, point });

  const newPoint = {
    x:
      Math.cos(angle) * (point.x - pivot.x) -
      Math.sin(angle) * (point.y - pivot.y) +
      pivot.x,
    y:
      Math.sin(angle) * (point.x - pivot.x) +
      Math.cos(angle) * (point.y - pivot.y) +
      pivot.y,
    dx: 0,
    dy: 0,
  };

  // const newPoint = point;
  console.log(newPoint);
  return newPoint;
}

//https://stackoverflow.com/a/35069576/1068446
export function findPointAlongLine(
  p0: Position,
  p1: Position,
  distance: number
): Position {
  const distanceBetweenPoints = Math.sqrt(
    ((p1.x - p0.x) ^ 2) + ((p1.y - p0.y) ^ 2)
  );

  const percentageOfDistance = distance / distanceBetweenPoints;

  const dX = p1.x - p0.x;
  const dY = p1.y - p0.y;

  const newPoint = {
    x: p0.x + dX * percentageOfDistance,
    y: p0.y + dY * percentageOfDistance,
    dx: 0,
    dy: 0,
  };

  return newPoint;
}

export function findPointAtAngleAndDistanceFromLine(
  p0: Position,
  p1: Position,
  distance: number,
  angle: number
): Position {
  console.log("math", { p0, p1, distance, angle });

  const pointAlongLine = findPointAlongLine(p0, p1, distance);
  // const newPoint = rotatePointAboutPoint(p0, pointAlongLine, angle);

  const newPoint = rotatePointAboutPoint(p0, pointAlongLine, angle);

  return newPoint;
  //return pointAlongLine;
}
