import {
  ITheWholeModel,
  IDrawMaker,
  ITickable,
  DrawPackage,
  ModelMap,
  constructModelFromJsonArray,
} from "./AbstractModelItem";

import { Algorithm } from "../Algorithms/_Algorithm";
import * as algorithms from "../Algorithms/_index";

import {
  AbstractControlId,
  AbstractControlOutput,
  AbstractControlOutputValue,
  ControlHint,
} from "../Frontend/Controls/Abstractions";
import { ControlConfigAndUpdateFunction } from "./ValueMakers/AbstractValueMaker";
import { createDrawMakersFromDrawItems } from "./AbstractDrawItem";

/**
 * This file is the main entry point into the pure javascript model. ie. All frontend interactions should be through methods exposed here.
 */

export class TheWholeModel implements ITheWholeModel {
  private _drawmakers: IDrawMaker[] = [];
  private _tickables: ITickable[] = [];
  private _controlConfigs: ControlConfigAndUpdateFunction<unknown>[];

  private _updateFns: Record<
    AbstractControlId,
    (value: AbstractControlOutputValue) => void
  > = {};

  constructor(modelMap: ModelMap, drawMakers: Array<IDrawMaker>) {
    const tickables = Object.values(modelMap).filter((v) => {
      //@ts-ignore
      if (v.tick) {
        return true;
      }
    });

    const controlConfigs = Object.values(modelMap).flatMap((v) => {
      return v.getControlConfig();
    });

    //@ts-ignore
    this._tickables = tickables;
    //@ts-ignore
    this._controlConfigs = controlConfigs;
    this._drawmakers = drawMakers;

    this._updateFns = controlConfigs.reduce((acc, cur) => {
      return {
        ...acc,
        [cur.config.id]: cur.updateFn,
      };
    }, {});
  }

  /**
   * An external source will control when the tick happens
   * eg. setInterval, or drawAnimationFrame
   * * @returns
   */
  tick() {
    this._tickables.forEach((v) => {
      v.tick();
    });

    return this._drawmakers.reduce(
      (acc, cur) => {
        const drawPackage = cur.getDrawables();
        return {
          temp: [...acc.temp, ...drawPackage.temp],
          paint: [...acc.paint, ...drawPackage.paint],
        };
      },
      { temp: [], paint: [] } as DrawPackage
    );
  }

  /**
   * Provide updates in to the model values
   * @param value
   */
  updateProperty(value: AbstractControlOutput<AbstractControlId, unknown>) {
    this._updateFns[value.id](value.value);
  }

  /**
   * Get hints about how the model should be displayed
   * @returns
   */
  getControlConfigs(): ControlConfigAndUpdateFunction<unknown>[] {
    return this._controlConfigs;
  }
}

export const preBuiltModels: Record<string, Algorithm> = algorithms;

export function getModel(modelName: keyof typeof preBuiltModels): {
  model: TheWholeModel;
  controlHints: Array<ControlHint>;
} {
  const prebuiltModel = preBuiltModels[modelName];
  const { modelDefinition, drawMakers, controlHints } = prebuiltModel;

  //@ts-ignore
  const modelMap = constructModelFromJsonArray(modelDefinition);
  //@ts-ignore
  const drawMakersObjects = createDrawMakersFromDrawItems(drawMakers, modelMap);

  const model = new TheWholeModel(modelMap, drawMakersObjects);

  return { model, controlHints };
}
