import { GeneralError, NotImplementedError } from "../../Errors/errors";
import {
  AbstractControlType,
  ControlConfig,
} from "../../Frontend/Controls/Abstractions";
import {
  findValueByKey,
  NodeReferenceMap,
  ValueJson,
  ValueMakers,
  ValueMakersMap,
  ValueMakersParamMap,
  ValueTypeMap,
} from "../AbstractModelItem";

export type ControlConfigAndUpdateFunction<T> = {
  config: ControlConfig<AbstractControlType>;
  updateFn: (value: T) => void;
};

export class AbstractValueMaker<TValueMaker extends ValueMakers> {
  protected id: string;
  protected valueType: ValueJson<TValueMaker>["valueType"];
  protected valueMaker: TValueMaker;

  protected valueJson: ValueJson<TValueMaker>;
  protected referencedNodes: NodeReferenceMap<
    TValueMaker,
    ValueJson<TValueMaker>
  >;

  protected lookupValueByKey: <
    K extends keyof ValueMakersParamMap[TValueMaker]
  >(
    key: K
  ) => ValueMakersParamMap[TValueMaker][K];

  constructor(
    valueJson: ValueJson<TValueMaker>,
    referencedNodes: NodeReferenceMap<TValueMaker, ValueJson<TValueMaker>>
  ) {
    this.valueType = valueJson.valueType;
    this.valueMaker = valueJson.valueMaker;
    this.id = valueJson.id;

    this.valueJson = valueJson;
    this.referencedNodes = referencedNodes;

    this.lookupValueByKey = (key) => {
      const value = findValueByKey(
        valueJson.valueMaker,
        //@ts-ignore - Put a TS ignore here, for some reason the error isn't showing up in the IDE :(
        valueJson,
        referencedNodes,
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

  getValue(): ValueTypeMap[ValueMakersMap[TValueMaker]] {
    throw new NotImplementedError();
  }

  updateValue(v: ValueTypeMap[ValueMakersMap[TValueMaker]]) {
    throw new NotImplementedError();
  }

  getControlConfig(): Array<
    ControlConfigAndUpdateFunction<ValueTypeMap[ValueMakersMap[TValueMaker]]>
  > {
    return [];
  }

  toJson(): ValueJson<TValueMaker> {
    return this.valueJson;
  }
}
