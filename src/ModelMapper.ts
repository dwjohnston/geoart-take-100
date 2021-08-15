import {
  ITheWholeModel,
  IDrawMaker,
  ITickable,
  DrawPackage,
  ModelMap,
  constructModelFromJsonArray,
} from "./PureModel/AbstractModelItem";

import { Algorithm } from "./Algorithms/_Algorithm";
import * as algorithms from "./Algorithms/_index";

import {
  AbstractControlId,
  AbstractControlOutput,
  AbstractControlOutputValue,
  ControlHint,
} from "./Frontend/Controls/Abstractions";
import { ControlConfigAndUpdateFunction } from "./PureModel/ValueMakers/AbstractValueMaker";
import { createDrawMakersFromDrawItems } from "./PureModel/AbstractDrawItem";

// const modelMap = {
//   "linear-mover": LinearMover,
//   planet: Planet,
//   linker: Linker,
// } as const;

// type DefinitionItem<T extends keyof typeof modelMap = keyof typeof modelMap> = {
//   [key in T]: {
//     itemKey: T;
//     props: ConstructorParameters<typeof modelMap[T]>;
//   };
// }[T];

// type PossibleDefinitionItem <T extends keyof typeof modelMap> = {
//     [key in T]: DefinitionItem<key>;
// }[T];

// type Definition = Array<DefinitionItem>;

export class TheWholeModel implements ITheWholeModel {
  private _drawmakers: IDrawMaker[] = [];
  private _tickables: ITickable[] = [];
  private _controlConfigs: ControlConfigAndUpdateFunction<unknown>[];

  private _updateFns: Record<
    AbstractControlId,
    (value: AbstractControlOutputValue) => void
  > = {};

  //private controlFlatMap: Record<string, IControllable<unknown>>;

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

  updateProperty(value: AbstractControlOutput<AbstractControlId, unknown>) {
    this._updateFns[value.id](value.value);
  }

  getControlConfigs(): ControlConfigAndUpdateFunction<unknown>[] {
    return this._controlConfigs;
  }
}

/**
 * The thing that is returned from this, needs to: 
 * 
 *  1. Regularly tick the quartz
 *  2. After each tick, retrieve the drawables
 *  3. Declare a list of controllers to put on the FE.  
 *  4. Respond to property update events. 
 * @param definition 
//  */
// export function createModelFromDefinition(definition: Definition) : TheWholeModel{

//     return new TheWholeModel(definition);

// }

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
