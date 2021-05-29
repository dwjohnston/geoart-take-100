import { NotImplementedError } from "../../Errors/errors";
import {
  AbstractControlType,
  ControlConfig,
} from "../../Frontend/Controls/Abstractions";
import { ITickable, Position } from "../AbstractModelItem";
import {
  AbstractValueMaker,
  ControlConfigAndUpdateFunction,
} from "./AbstractValueMaker";
import { AbstractNumberMaker, TickingPhasingNumberMaker } from "./NumberMakers";

import { v4 as uuid } from "uuid";

export class AbstractPositionMaker extends AbstractValueMaker<Position> {}

export class StaticPositionMaker extends AbstractPositionMaker {
  private position: Position;
  constructor(position: Position) {
    super();

    this.position = position;
  }

  getValue(): Position {
    return this.position;
  }

  getTickables(): ITickable[] {
    return [];
  }
}

export class OrbittingPositionMaker
  extends AbstractPositionMaker
  implements ITickable
{
  private center: AbstractPositionMaker;

  private radius: AbstractNumberMaker;
  private speed: AbstractNumberMaker;
  private id: string;

  private phase: TickingPhasingNumberMaker;

  constructor(
    center: AbstractPositionMaker,
    radius: AbstractNumberMaker,
    speed: AbstractNumberMaker,
    phase: TickingPhasingNumberMaker,
    id: string = uuid()
  ) {
    super();
    this.center = center;
    this.radius = radius;
    this.speed = speed;
    this.phase = phase;

    this.id = id;
  }

  getValue(): Position {
    return {
      x:
        this.center.getValue().x +
        Math.cos(Math.PI * 2 * Math.PI * this.phase.getValue()) *
          this.radius.getValue(),
      y:
        this.center.getValue().y +
        Math.sin(Math.PI * 2 * Math.PI * this.phase.getValue()) *
          this.radius.getValue(),
    };
  }

  tick() {
    this.phase.tick();
  }

  getTickables(): ITickable[] {
    return [this.phase];
  }

  getControlConfig(): Array<ControlConfigAndUpdateFunction<any>> {
    return [
      ...this.speed.getControlConfig(),
      ...this.radius.getControlConfig(),
    ];
  }
}
