import { getPositionOfLineAndCharacter } from "typescript";
import {
  AbstractControlId,
  AbstractControlOutput,
  AbstractControlType,
  ControlConfig,
} from "../Frontend/Controls/Abstractions";
import { ControlConfigAndUpdateFunction } from "./ValueMakers/AbstractValueMaker";

export type Canvas = {
  ctx: CanvasRenderingContext2D;
};

export type Position = {
  x: number; // 0 - 1
  y: number; // 0 - 1
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
  getDrawables: () => DrawPackage;
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

// export type ControllerMap = {
//     [key :string]: IControllable<unknown> | ControllerMap // This isn't quite right
// };

export interface IControllable<T> {
  updateValue: (value: T) => void;
  getControlConfig: () => ControlConfigAndUpdateFunction<T>[];
}

export type ValueReference<T> =
  | {
    type: "static";
    value: T;
  }
  | {
    type: "reference";
    reference: string;
  };

export type ValueTypes = "number" | "position" | "color";

export type ValueTypeMap = {
  number: number;
  color: string;
  position: Position;
};

export type EnforcedValueType<T, U extends ValueTypes> = ValueTypeMap[U] & T;
export type EnforcedValueMaker<T extends ValueMakers, U extends ValueTypes> = ValueMakersMap[T] extends U ? T : never;


export type ValueMakers =
  | "StaticNumberMaker"
  | "StaticPositionMaker"
  | "OrbitingPositionMaker"
  | "TickingPhaseMaker";

export type ValueMakersMap = {
  StaticPositionMaker: "position";
  OrbitingPositionMaker: "position";
  StaticNumberMaker: "number";
  TickingPhaseMaker: "number";
};

export type PossibleValueMakersForValueType<T extends ValueMakersMap[TValueMakers], TValueMakers extends ValueMakers = ValueMakers> = ValueMakersMap[TValueMakers] extends T ? ValueMakersMap[TValueMakers] : never;

export type ValueMakersParamMap = {
  StaticPositionMaker: {
    value: Position;
  };

  StaticNumberMaker: {
    value: number;
    min: number;
    max: number;
    step: number;
  };

  OrbitingPositionMaker: {
    center: Position;
    radius: number;
    speed: number;
    phase: number;
  };
  TickingPhaseMaker: {
    initialValue: number;
    max: number;
    step: number;
  };
};

export type ParamsWithReferences<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K] | ValueReference<T[K]>
}

export type ValueJson<
  TValueMaker extends ValueMakers,
  TValueType extends ValueMakersMap[TValueMaker]
  > = {
    valueType: TValueType;
    valueMaker: EnforcedValueMaker<TValueMaker, TValueType>;
    params: ParamsWithReferences<ValueMakersParamMap[TValueMaker]>;
    id: string;
  };






export function createMapFromArray(json: Array<ValueJson<ValueMakers, ValueMakersMap[ValueMakers]>>) : Record<string, ValueJson<ValueMakers, ValueMakersMap[ValueMakers]>> {


  return json.reduce((acc, cur) => {

    if (acc[cur.id]) {
      throw new Error("Duplicate key detected");
    }
    return {
      ...acc,
      [cur.id]: cur
    }
  }, {} as Record<string, ValueJson<ValueMakers, ValueMakersMap[ValueMakers]>>);
}

function objectIsValueReference(obj: unknown): obj is ValueReference<unknown> {

  const _obj = obj as ValueReference<unknown>;

  if (typeof _obj === 'object' && _obj !== null && _obj.type !== undefined){
    return true; 
  }

  return false; 
}

export function checkForCircularDependencies(json: Array<ValueJson<ValueMakers, ValueMakersMap[ValueMakers]>>) {

  const map =createMapFromArray(json);


  json.forEach((valueJson) => {
    const foundIds : Record<string, boolean> = {

    }; 

    const recursiveCheck = (currentJson: ValueJson<ValueMakers, ValueMakersMap[ValueMakers]>) => {
      const params = Object.values(currentJson.params); 

      params.forEach((param) => {
        if (objectIsValueReference(param)){

          if (param.type === 'reference') {
            if (foundIds[param.reference]) {
              throw new Error("Circular loop detected!");
            }
            foundIds[param.reference] = true; 

            const newReference = map[param.reference]; 


            recursiveCheck(newReference);
          }
        }
      });

    }; 

    recursiveCheck(valueJson);
  }); 


}


export function constructModelFromJsonArray(json: Array<ValueJson<ValueMakers, ValueMakersMap[ValueMakers]>>) {

}