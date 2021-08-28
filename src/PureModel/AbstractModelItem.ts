import { GeneralError } from "../Errors/errors";
import {
  AbstractControlId,
  AbstractControlOutput,
} from "../Frontend/Controls/Abstractions";
import {
  AbstractValueMaker,
  ControlConfigAndUpdateFunction,
  NodeReference,
} from "./ValueMakers/AbstractValueMaker";
import { AllValueMakerTypings } from "./ValueMakers/ConcreteMap";

export type Canvas = {
  ctx: CanvasRenderingContext2D;
};

/** A drawable object.
 *
 * eg. line, square, circle etc.
 */
export interface IDrawable {
  draw: (ctx: Canvas) => void;
}

/**
 * A package of both temporary drawables and permentant drawables
 */
export type DrawPackage = {
  temp: IDrawable[];
  paint: IDrawable[];
};

/** An object that returns a list of Drawables */
export interface IDrawMaker {
  getDrawables: (debugMode?: boolean) => DrawPackage;
}

/** A object that can respond to ticks */
export interface ITickable {
  tick: () => void;
}

export interface ITheWholeModel {
  tick: () => DrawPackage;
  updateProperty: (
    value: AbstractControlOutput<AbstractControlId, unknown>
  ) => void; // TODO probably have a tighter definition.
}

// Fairly sure this isn't right.
export type ModelMap = Record<string, AbstractValueMaker<AllValueMakerTypings>>;

export function getValueMakerFromReferenceNode(
  referenceNode: NodeReference,
  modelMap: ModelMap
) {
  const node = modelMap[referenceNode.reference];

  if (!node) {
    throw new GeneralError("Value maker was not found", {
      referenceNode,
      node,
      modelMap,
    });
  }

  return node;
}
