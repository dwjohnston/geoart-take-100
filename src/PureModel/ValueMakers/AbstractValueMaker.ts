import { GeneralError, NotImplementedError } from "../../Errors/errors";
import { ControlConfig } from "../../Frontend/Controls/Abstractions";
import { AbstractControlType } from "../../Frontend/Controls/mapping";
import { Color, Position, Vertex } from "../ValueTypes";
import { AllValueMakerTypings, TypingsMap } from "./ConcreteMap";
import { findValueByKey } from "./_functions/findValueByKey";

export type ControlConfigAndUpdateFunction<
  T extends ValueMakerTyping,
  K extends keyof T["params"] = keyof T["params"]
> = {
  paramKey: K;
  config: ControlConfig<AbstractControlType>;
  updateFn: (value: T["params"][K]) => void;
};

/** move these? */

type PossibleValueTypes = Color | number | Position | Vertex;

// This doesn't work properly
type ReverseValueTypeMapLookup<T extends PossibleValueTypes> = T extends Color
  ? "color"
  : T extends number
  ? "number"
  : T extends Position
  ? "position"
  : never;

export type PossibleParamValue<T extends ValueMakerTyping> =
  T["params"][string];

/**
 * This is an _abstract_ typing
 *
 * ie. other typings will implement this
 */
export type ValueMakerTyping = {
  name: string;
  params: Record<string, PossibleValueTypes>;
  valueType: PossibleValueTypes;
};

export type ValueJsonParameters<T> = {
  [K in keyof T]: ParameterValue<T[K]>;
};

export type ValueJson<T extends keyof TypingsMap = keyof TypingsMap> = {
  [K in keyof TypingsMap]: {
    valueType: any; // For now - because I don't think this is being useful.
    valueMakerName: K;
    params: ValueJsonParameters<TypingsMap[K]["params"]>;
    id: string;
  };
}[T];

export type DiscriminatedValueMakerTypeName<
  T extends keyof TypingsMap = keyof TypingsMap
> = {
  [K in keyof TypingsMap]: K;
}[T];

/** Value reference - when declaring a model, you are referring to either a fix value ('static') or a reference value (eg. another node) */
export type ParameterValue<T> = StaticReference<T> | NodeReference | T;

export type StaticReference<T> = {
  type: "static";
  value: T;
};

export type NodeReference = {
  type: "reference";
  reference: string;
};

/**
 * This is the a map of possible parameters, to instantiated classes providing those parameters
 */
export type NodeReferenceMap<TValueMakerTyping extends ValueMakerTyping> =
  Partial<
    {
      [K in keyof TValueMakerTyping["params"]]: {
        getValue(): TValueMakerTyping["params"];
      };
    }
  >;

export class AbstractValueMaker<
  TValueMakerTyping extends AllValueMakerTypings
> {
  protected id: string;
  protected valueType: ReverseValueTypeMapLookup<
    TValueMakerTyping["valueType"]
  >;
  protected valueMakerName: TValueMakerTyping["name"];

  protected valueJson: ValueJson<TValueMakerTyping["name"]>;
  protected referencedNodes: NodeReferenceMap<TValueMakerTyping>;

  protected lookupValueByKey: <K extends keyof TValueMakerTyping["params"]>(
    key: K
  ) => TValueMakerTyping["params"][K];

  constructor(
    valueJson: ValueJson<TValueMakerTyping["name"]>,
    referencedNodes: NodeReferenceMap<TValueMakerTyping>
  ) {
    this.valueType = valueJson.valueType;
    this.valueMakerName = valueJson.valueMakerName;
    this.id = valueJson.id;

    this.valueJson = valueJson;
    this.referencedNodes = referencedNodes;

    this.lookupValueByKey = (key) => {
      const value = findValueByKey(
        valueJson.valueMakerName,
        valueJson,
        referencedNodes,

        //@ts-ignore - not sure what's happening here
        key
      );

      if (value === undefined) {
        throw new GeneralError("Lookup value was not found!", {
          key,
          referencedNodes,
        });
      }
      return value;
    };
  }

  /**
   * This is the main thing you will need to implement
   */
  getValue(): TValueMakerTyping["valueType"] {
    throw new NotImplementedError();
  }

  /**


  Can probably be removed. Implement as part of getControlConfig. 
   * @param v
   */
  updateValue(v: TValueMakerTyping["valueType"]) {
    throw new NotImplementedError();
  }

  /**
   * Implement this if you want to provide default control hints.
   * You only need to implement this if it is a static value maker (ie. an atomic level value maker)
   * @returns
   */
  getControlConfig(): Array<ControlConfigAndUpdateFunction<TValueMakerTyping>> {
    return [];
  }

  /**
   * You will not need to implement this.
   * @returns
   */
  toJson(): ValueJson<TValueMakerTyping["name"]> {
    return this.valueJson;
  }
}
