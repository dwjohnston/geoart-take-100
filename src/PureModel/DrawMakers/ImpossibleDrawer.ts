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
  const thisM = findPointAlongLine(vertex.pVertex, vertex.pLeft.pVertex, trim);
  const thisN = findPointAlongLine(vertex.pVertex, vertex.pRight.pVertex, trim);

  const leftM = findPointAlongLine(
    vertex.pLeft.pVertex,
    vertex.pLeft.pLeft.pVertex,
    trim
  );
  const leftN = findPointAlongLine(
    vertex.pLeft.pVertex,
    vertex.pLeft.pRight.pVertex,
    trim
  );

  const rightM = findPointAlongLine(
    vertex.pRight.pVertex,
    vertex.pRight.pLeft.pVertex,
    trim
  );
  const rightN = findPointAlongLine(
    vertex.pRight.pVertex,
    vertex.pRight.pRight.pVertex,
    trim
  );

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
  private pVertex: AbstractValueMaker<PossibleVertexMakers>;
  private pVertexLeft: AbstractValueMaker<PossibleVertexMakers>;
  private pVertexRight: AbstractValueMaker<PossibleVertexMakers>;

  private trim: AbstractValueMaker<PossibleNumberMakers>;

  constructor(params: {
    pVertex: AbstractValueMaker<PossibleVertexMakers>;
    pVertexLeft: AbstractValueMaker<PossibleVertexMakers>;
    pVertexRight: AbstractValueMaker<PossibleVertexMakers>;
    trim: AbstractValueMaker<PossibleNumberMakers>;
  }) {
    const { pVertex, pVertexLeft, pVertexRight, trim } = params;
    this.pVertex = pVertex;
    this.pVertexLeft = pVertexLeft;
    this.pVertexRight = pVertexRight;
    this.trim = trim;
  }

  getDrawables() {
    const pVertex = this.pVertex.getValue();
    const pVertexLeft = this.pVertexLeft.getValue();
    const pVertexRight = this.pVertexRight.getValue();

    const trim = this.trim.getValue();

    const thisM = findPointAlongLine(
      pVertex.pVertex,
      pVertexLeft.pVertex,
      trim
    );
    const thisN = findPointAlongLine(
      pVertex.pVertex,
      pVertexRight.pVertex,
      trim
    );

    const leftM = findPointAlongLine(
      pVertexLeft.pVertex,
      pVertexLeft.pLeft.pVertex,
      trim
    );
    const leftN = findPointAlongLine(
      pVertexLeft.pVertex,
      pVertex.pVertex,
      trim
    );

    const rightM = findPointAlongLine(
      pVertexRight.pVertex,
      pVertex.pVertex,
      trim
    );
    const rightN = findPointAlongLine(
      pVertexRight.pVertex,
      pVertexRight.pRight.pVertex,
      trim
    );

    const shiftLeft = getDiffBetweenPoints(leftM, leftN);
    const shiftRight = getDiffBetweenPoints(rightN, rightM);

    const thisInnerO = shiftPoint(shiftPoint(thisM, shiftLeft), shiftLeft);
    const thisInnerP = shiftPoint(thisInnerO, shiftRight);

    return {
      temp: [
        new Line(leftN, thisM, "rgba(255, 0, 0, 1)"),
        new Line(rightM, thisN, "rgba(255, 0, 0, 1)"),
        new Line(thisM, thisN, "rgba(255, 0, 0, 1)"),
        new Line(thisInnerO, thisInnerP, "rgba(255, 255, 255, 1)"),
      ],
      paint: [],
    };
  }
}
