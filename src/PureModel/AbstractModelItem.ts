import {
  getPositionOfLineAndCharacter,
  isTypeReferenceNode,
  parseIsolatedEntityName,
} from "typescript";
import { GeneralError } from '../Errors/errors';
import {
  AbstractControlId,
  AbstractControlOutput,
  AbstractControlType,
  ControlConfig,
} from "../Frontend/Controls/Abstractions";
import { partition } from "../utils/partition";
import {
  AbstractValueMaker,
  ControlConfigAndUpdateFunction,
} from "./ValueMakers/AbstractValueMaker";
import {
  StaticNumberMaker,
  PhasingNumberMaker,
} from "./ValueMakers/NumberMakers";
import {
  StaticPositionMaker,
  OrbittingPositionMaker,
} from "./ValueMakers/PositionMakers";

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

export type ValueReference<T> = StaticReference<T> | NodeValueReference;

export type StaticReference<T> = {
  type: "static";
  value: T;
};
export type NodeValueReference = {
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
export type EnforcedValueMaker<T extends ValueMakers, U extends ValueTypes> =
  ValueMakersMap[T] extends U ? T : never;

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



// A little confusing but note that the types on the left are different to the classes on the right.
export const ValueMakersConstructorMap = {
  StaticPositionMaker: StaticPositionMaker,
  OrbitingPositionMaker: OrbittingPositionMaker,
  StaticNumberMaker: StaticNumberMaker,
  TickingPhaseMaker: PhasingNumberMaker,
};



export type PossibleValueMakersForValueType<
  T extends ValueMakersMap[TValueMakers],
  TValueMakers extends ValueMakers = ValueMakers
> = ValueMakersMap[TValueMakers] extends T
  ? ValueMakersMap[TValueMakers]
  : never;

export type ValueMakersParamMap = {
  StaticPositionMaker: {
    value: Position;
  };

  StaticNumberMaker: {
    value: number;
  };

  OrbitingPositionMaker: {
    center: Position;
    radius: number;
    phase: number;
  };
  TickingPhaseMaker: {
    initialValue: number;
    max: number;
    step: number;
  };
};

export type ParamsWithReferences<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K] | ValueReference<T[K]>;
};

export type ValueJson<
  TValueMaker extends ValueMakers = ValueMakers,
  TValueType extends ValueMakersMap[TValueMaker] = ValueMakersMap[TValueMaker] // TODO we can remove this generic param
> = {
  valueType: TValueType;
  valueMaker: EnforcedValueMaker<TValueMaker, TValueType>;
  params: ParamsWithReferences<ValueMakersParamMap[TValueMaker]>;
  id: string;
};

export type ValueMakerClassInstance<
  TValueMaker extends ValueMakers,
  TValueType extends ValueMakersMap[TValueMaker]
> = AbstractValueMaker<TValueMaker, TValueType, ValueTypeMap[TValueType]>;

export type NodeReferenceMap<
  TValueMaker extends ValueMakers,
  TValueType extends ValueMakersMap[TValueMaker],
  TValueJson extends ValueJson<TValueMaker, TValueType>
> = {
  [K in keyof TValueJson["params"]]: TValueJson["params"][K] extends NodeValueReference
    ? ValueMakerClassInstance<TValueMaker, TValueType>
    : undefined;
};

export function createMapFromArray(
  json: Array<ValueJson<ValueMakers, ValueMakersMap[ValueMakers]>>
): Record<string, ValueJson<ValueMakers, ValueMakersMap[ValueMakers]>> {
  return json.reduce((acc, cur) => {
    if (acc[cur.id]) {
      throw new Error("Duplicate key detected");
    }
    return {
      ...acc,
      [cur.id]: cur,
    };
  }, {} as Record<string, ValueJson<ValueMakers, ValueMakersMap[ValueMakers]>>);
}

function objectIsValueReference(obj: unknown): obj is ValueReference<unknown> {
  const _obj = obj as ValueReference<unknown>;

  if (typeof _obj === "object" && _obj !== null && _obj.type !== undefined) {
    return true;
  }

  return false;
}

function objectIsReference(obj: unknown): obj is NodeValueReference {
  if (objectIsValueReference(obj)) {
    if (obj.type === "reference") {
      if (!obj.reference) {
        throw new Error(
          "Some how encountered a reference object that didn't have a reference"
        );
      }
      return true;
    }
  }

  return false;
}

export function checkForCircularDependencies(
  json: Array<ValueJson<ValueMakers, ValueMakersMap[ValueMakers]>>
) {
  const map = createMapFromArray(json);

  json.forEach((valueJson) => {
    const foundIds: Record<string, boolean> = {};

    const recursiveCheck = (
      currentJson: ValueJson<ValueMakers, ValueMakersMap[ValueMakers]>
    ) => {

      console.log(currentJson);

      const params = Object.values(currentJson.params);

      params.forEach((param) => {
        if (objectIsReference(param)) {
          if (foundIds[param.reference]) {
            throw new Error("Circular loop detected!");
          }
          foundIds[param.reference] = true;
          const newReference = map[param.reference];

          if (!newReference) {
            throw new Error("Referenced node does not exist!");
          }

          recursiveCheck(newReference);
        }
      });
    };

    recursiveCheck(valueJson);
  });
}


// Fairly sure this isn't right.
export type ModelMap = Record<string, AbstractValueMaker<ValueMakers, ValueMakersMap[ValueMakers], ValueTypeMap[ValueMakersMap[ValueMakers]]>>; 

function constructSingleModelItemFromJson(
  valueJson: ValueJson<ValueMakers, ValueMakersMap[ValueMakers]>,
  dependencyNodes: any = {} // I'm getting lazy
) {
  const Class = ValueMakersConstructorMap[valueJson.valueMaker];

  //@ts-ignore - obvs I need to sort this.
  return new Class(valueJson, dependencyNodes);
}

export function constructModelFromJsonArray(
  json: Array<ValueJson<ValueMakers, ValueMakersMap[ValueMakers]>>
) : ModelMap {
  checkForCircularDependencies(json);

  // Split into dependant nodes and leaf nodes so we can process the leaf nodes first
  const [leafNodes, dependantNodes] = partition(json, (v) => {
    const params = Object.values(v.params);
    const hasDependencies = params.reduce((acc, cur) => {
      if (objectIsValueReference(cur)) {
        return cur.type === "reference";
      } else {
        return acc;
      }
    }, false);

    return !hasDependencies;
  });

  let map = leafNodes.reduce((acc, cur) => {
    return {
      ...acc,
      [cur.id]: constructSingleModelItemFromJson(cur, {}),
    };
  }, {} as Record<string, unknown>); // Unknown for now. It's an instance of the class objects

  let keepProcessing = true;
  let i = 0;
  while (keepProcessing) {
    const valueJson = dependantNodes[i];

    const params = Object.values(valueJson.params);

    const readyToCreate = params.every((v) => {
      if (objectIsReference(v)) {
        return !!map[v.reference];
      } else {
        return true;
      }
    });

    if (readyToCreate) {
      const dependencies = {};

      const paramClassInstances = Object.entries(valueJson.params).reduce(
        (acc, [key, param]) => {
          if (objectIsReference(param)) {
            const classInstance = map[param.reference];
            if (!classInstance) {
              throw new Error(
                "Something has gone wrong - referenced node doesn't exist"
              );
            }
            return {
              ...acc,
              [key]: classInstance,
            };
          } else {
            return acc;
          }
        },
        {}
      );

      console.log(paramClassInstances);

      const newNode = constructSingleModelItemFromJson(
        valueJson,
        paramClassInstances
      );
      if (map[valueJson.id]) {
        throw new Error(
          "Something has gone wrong - new node already exists on the map"
        );
      }
      map[valueJson.id] = newNode;

      dependantNodes.splice(i, 1);
    }

    if (dependantNodes.length === 0) {
      keepProcessing = false;
    } else {
      i = (i + 1) % dependantNodes.length;
    }
  }

  return map as ModelMap;
}

// Fair bit of type coercion here, but I think it works
export function getValue<
  TValueMaker extends ValueMakers,
  TValueType extends ValueMakersMap[TValueMaker],
  TValueJson extends ValueJson<TValueMaker, TValueType>,
  TReferenceNodes extends NodeReferenceMap<TValueMaker, TValueType, TValueJson>
>(
  valueMakerString: TValueMaker, //- This solves a type issue, but I don't think it should be neccesary.
  valueJson: TValueJson,
  referenceNodes: TReferenceNodes,
  paramKey: keyof TValueJson["params"]
): ValueTypeMap[TValueType] {
  const param = valueJson.params[paramKey];

  if (objectIsValueReference(param)) {
    if (objectIsReference(param)) {
      const referencedNode = referenceNodes[paramKey];

      if (!referencedNode) {
        throw new Error(
          "Something has gone wrong - reference node doesn't exist"
        );
      }
      return referencedNode.getValue();
    } else {
      return (param as StaticReference<ValueTypeMap[TValueType]>).value;
    }
  } else {
    return param as unknown as ValueTypeMap[TValueType];
  }
}


export function getValueMakerFromReferenceNode(referenceNode: NodeValueReference, modelMap: ModelMap) {

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