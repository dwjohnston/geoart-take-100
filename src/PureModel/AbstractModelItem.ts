import { GeneralError } from "../Errors/errors";
import {
  AbstractControlId,
  AbstractControlOutput,
} from "../Frontend/Controls/Abstractions";
import { partition } from "../utils/partition";
import {
  AbstractValueMaker,
  ControlConfigAndUpdateFunction,
  ValueJson,
  ValueMakerTyping,
} from "./ValueMakers/AbstractValueMaker";
import {
  PossibleColorMakers,
  StaticColorMaker,
} from "./ValueMakers/ColorMakers/ColorMakers";
import {
  StaticNumberMaker,
  PhasingNumberMaker,
  SineNumberMaker,
  Normalizer,
  PossibleNumberMakers,
} from "./ValueMakers/NumberMakers/NumberMakers";
import {
  StaticPositionMaker,
  OrbittingPositionMaker,
  XYPositionMaker,
  PossiblePositionMakers,
  RollingBallPositionMaker,
} from "./ValueMakers/PositionMakers/PositionMakers";

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

/** could this be deleted? */
export interface IControllable<T> {
  updateValue: (value: T) => void;
  getControlConfig: () => ControlConfigAndUpdateFunction<T>[];
}

// Fairly sure this isn't right.
export type ModelMap = Record<string, AbstractValueMaker<ValueMakers>>;

export function getValueMakerFromReferenceNode(
  referenceNode: NodeValueReference,
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
