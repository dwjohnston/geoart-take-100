import {
  findPointAlongLine,
  getDiffBetweenPoints,
  shiftPoint,
} from "../../Math";
import { IDrawMaker } from "../AbstractModelItem";
import { Circle } from "../Drawables/Circle";
import { Line } from "../Drawables/Line";

import { AbstractValueMaker } from "../ValueMakers/AbstractValueMaker";
import { PossibleNumberMakers } from "../ValueMakers/NumberMakers";
import { PossiblePositionMakers } from "../ValueMakers/PositionMakers";
import { PossibleVertexMakers } from "../ValueMakers/VertexMakers.ts";
import { Position, Vertex } from "../ValueTypes";

function getPointsForVertex(
  vertex: Vertex,
  vLeft: Vertex,
  vRight: Vertex,
  trim: number
): {
  m: Position;
  n: Position;
  o: Position;
  p: Position;
} {
  const thisM = findPointAlongLine(vertex.pVertex, vertex.pLeft, trim);
  const thisN = findPointAlongLine(vertex.pVertex, vertex.pRight, trim);

  const leftM = findPointAlongLine(vLeft.pVertex, vLeft.pLeft, trim);
  const leftN = findPointAlongLine(vLeft.pVertex, vLeft.pRight, trim);

  const rightM = findPointAlongLine(vRight.pVertex, vRight.pLeft, trim);
  const rightN = findPointAlongLine(vRight.pVertex, vRight.pRight, trim);

  const shiftLeft = getDiffBetweenPoints(leftM, leftN);
  const shiftRight = getDiffBetweenPoints(rightN, rightM);

  const thisInnerO = shiftPoint(shiftPoint(thisM, shiftLeft), shiftLeft);
  const thisInnerP = shiftPoint(thisInnerO, shiftRight);

  return {
    m: thisM,
    n: thisN,
    o: thisInnerO,
    p: thisInnerP,
  };
}

export class ImpossibleDrawer implements IDrawMaker {
  private thisVertex: AbstractValueMaker<PossibleVertexMakers>;
  private vertexLeft: AbstractValueMaker<PossibleVertexMakers>;
  private vertexRight: AbstractValueMaker<PossibleVertexMakers>;

  private leftsLeft: AbstractValueMaker<PossibleVertexMakers>;
  private rightsRight: AbstractValueMaker<PossibleVertexMakers>;

  private trim: AbstractValueMaker<PossibleNumberMakers>;

  constructor(params: {
    thisVertex: AbstractValueMaker<PossibleVertexMakers>;
    vertexLeft: AbstractValueMaker<PossibleVertexMakers>;
    vertexRight: AbstractValueMaker<PossibleVertexMakers>;
    leftsLeft: AbstractValueMaker<PossibleVertexMakers>;
    rightsRight: AbstractValueMaker<PossibleVertexMakers>;
    trim: AbstractValueMaker<PossibleNumberMakers>;
  }) {
    const {
      thisVertex,
      vertexLeft,
      vertexRight,
      trim,
      leftsLeft,
      rightsRight,
    } = params;

    this.thisVertex = thisVertex;
    this.vertexLeft = vertexLeft;
    this.vertexRight = vertexRight;
    this.trim = trim;

    this.leftsLeft = leftsLeft;
    this.rightsRight = rightsRight;
  }

  getDrawables() {
    const pVertex = this.thisVertex.getValue();
    const pVertexLeft = this.vertexLeft.getValue();
    const pVertexRight = this.vertexRight.getValue();
    const leftsLeft = this.leftsLeft.getValue();
    const rightsRight = this.rightsRight.getValue();

    const trim = this.trim.getValue();

    const thisPoints = getPointsForVertex(
      pVertex,
      pVertexLeft,
      pVertexRight,
      trim
    );
    const leftPoints = getPointsForVertex(
      pVertexLeft,
      leftsLeft,
      pVertex,
      trim
    );
    const rightPoints = getPointsForVertex(
      pVertexRight,
      pVertex,
      rightsRight,
      trim
    );

    return {
      temp: [
        new Line(leftPoints.n, thisPoints.m, "rgba(255, 0, 0, 1)"),
        new Line(rightPoints.m, thisPoints.n, "rgba(255, 0, 0, 1)"),
        new Line(thisPoints.n, thisPoints.m, "rgba(255, 0, 0, 1)"),
        new Line(thisPoints.o, rightPoints.n, "rgba(255, 255, 255, 1)"),
        new Line(thisPoints.o, leftPoints.p, "rgba(255, 255, 255, 1)"),
      ],
      paint: [],
    };
  }
}
