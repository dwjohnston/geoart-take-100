import { isThisTypeNode } from 'typescript';
import { NotImplementedError } from "../../Errors/errors";
import {
  AbstractControlType,
  ControlConfig,
} from "../../Frontend/Controls/Abstractions";
import {
  EnforcedValueMaker,
  EnforcedValueType,
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
  T extends ValueTypeMap[TValueType],

> {
  protected valueType: TValueType;
  protected valueMaker: TValueMaker;


  protected valueJson: ValueJson<TValueMaker, TValueType>; 

  constructor(valueJson: ValueJson<TValueMaker, TValueType>) {
    this.valueType = valueJson.valueType;
    this.valueMaker = valueJson.valueMaker;

    this.valueJson = valueJson; 

  }

  getValue(): T {
    throw new NotImplementedError();
  }

  updateValue(v: T) {
    throw new NotImplementedError();
  }

  getControlConfig(): ControlConfigAndUpdateFunction<T>[] {
    throw new NotImplementedError();
  }

  toJson(): ValueJson<TValueMaker, TValueType> {

    return this.valueJson;
  }
}
