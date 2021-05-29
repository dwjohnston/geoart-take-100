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
  ValueTypes,
} from "../AbstractModelItem";

export type ControlConfigAndUpdateFunction<T> = {
  config: ControlConfig<AbstractControlType>;
  updateFn: (value: T) => void;
};

export class AbstractValueMaker<
  T,
  TValueType extends EnforcedValueType<T, ValueTypes>,
  TValueMaker extends EnforcedValueMaker<ValueMakers, TValueType>
> {
  private valueType: TValueType;
  private valueMaker: TValueMaker;

  constructor(valueJson: ValueJson<TValueMaker, TValueType>) {
    this.valueType = valueJson.valueType;
    this.valueMaker = valueJson.valueMaker;
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
    throw new NotImplementedError();
  }
}
