export type Color = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export type Position = {
  x: number; // 0 - 1
  y: number; // 0 - 1

  // Tangent information
  dx: number;
  dy: number;

  color?: Color;
};

export type Vertex = {
  pLeft: Position;
  pRight: Position;
  pVertex: Position;
};
