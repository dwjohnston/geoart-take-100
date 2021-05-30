import { getConstantValue, isThisTypeNode } from "typescript";
import { NotImplementedError } from "../../Errors/errors";
import {
  AbstractControlType,
  ControlConfig,
} from "../../Frontend/Controls/Abstractions";
import {
  EnforcedValueMaker,
  EnforcedValueType,
  NodeReferenceMap,
  ValueJson,
  ValueMakers,
  ValueMakersMap,
  ValueTypeMap,
  ValueTypes,
} from "../AbstractModelItem";

export type ControlConfigAndUpdateFunction<T> = {
  config: ControlConfig<AbstractControlType>;
  updateFn: (value: T) => void;
};

export class AbstractValueMaker<
  TValueMaker extends ValueMakers,
  TValueType extends ValueMakersMap[TValueMaker],
  T extends ValueTypeMap[TValueType]
> {
  protected valueType: TValueType;
  protected valueMaker: TValueMaker;

  protected valueJson: ValueJson<TValueMaker, TValueType>;
  protected referencedNodes: NodeReferenceMap<
    TValueMaker,
    TValueType,
    ValueJson<TValueMaker, TValueType>
  >;

  constructor(
    valueJson: ValueJson<TValueMaker, TValueType>,
    referencedNodes: NodeReferenceMap<
      TValueMaker,
      TValueType,
      ValueJson<TValueMaker, TValueType>
    >
  ) {
    this.valueType = valueJson.valueType;
    this.valueMaker = valueJson.valueMaker;

    this.valueJson = valueJson;
    this.referencedNodes = referencedNodes;
  }

  getValue(): T {
    throw new NotImplementedError();
  }

  updateValue(v: T) {
    throw new NotImplementedError();
  }

  getControlConfig(): ControlConfigAndUpdateFunction<T>[] {
    return Object.values(this.referencedNodes).flatMap((v) => {
      if (v !== undefined) {
        // Not sure why the coercion is neccessary.
        return (v as AbstractValueMaker<any, any, any>).getControlConfig();
      } else {
        return [];
      }
    });
  }

  toJson(): ValueJson<TValueMaker, TValueType> {
    return this.valueJson;
  }
}
