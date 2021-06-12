
import { ITickable } from "./AbstractModelItem";


// NOT CURRENTLY BEING USED
export class LinearMover implements ITickable {
  private _x: number;
  private _y: number;

  private _dx: number;
  private _dy: number;

  constructor(x: number, y: number, dx: number, dy: number) {
    this._x = x;
    this._y = y;
    this._dx = dx;
    this._dy = dy;
  }

  tick() {
    this._x = this._x + this._dx;
    this._y = this._y + this._dy;
  }
}
