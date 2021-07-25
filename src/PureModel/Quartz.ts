import { ITickable } from "./AbstractModelItem";

// NOT CURRENTLY BEING USED
/**
 * You only want a single one of these.
 * This is the thing that is responsible for triggering tick events on all tickable objects.
 */
export class Quartz {
  private tickables: ITickable[];

  constructor(tickables: ITickable[]) {
    this.tickables = tickables;
  }

  tick() {
    this.tickables.forEach((v) => {
      v.tick();
    });
  }
}
