import { getConstantValue, isThisTypeNode, textChangeRangeIsUnchanged } from "typescript";
import { NotImplementedError } from "../../Errors/errors";
import {
  AbstractControlType,
  ControlConfig,
} from "../../Frontend/Controls/Abstractions";
import {
  EnforcedValueMaker,
  EnforcedValueType,
  findValueByKey,
  NodeReferenceMap,
  ValueJson,
  ValueMakers,
  ValueMakersMap,
  ValueMakersParamMap,
  ValueTypeMap,
  ValueTypes,
} from "../AbstractModelItem";

export type ControlConfigAndUpdateFunction<T> = {
  config: ControlConfig<AbstractControlType>;
  updateFn: (value: T) => void;
};

export class AbstractValueMaker<
  TValueMaker extends ValueMakers,
> {

  protected id: string; 
  protected valueType: ValueJson<TValueMaker>['valueType'];
  protected valueMaker: TValueMaker;

  protected valueJson: ValueJson<TValueMaker>;
  protected referencedNodes: NodeReferenceMap<
    TValueMaker,
    ValueJson<TValueMaker>
  >;


  protected lookupValueByKey : <K extends keyof ValueMakersParamMap[TValueMaker]>(key: K) => ValueMakersParamMap[TValueMaker][K]

  constructor(
    valueJson: ValueJson<TValueMaker>,
    referencedNodes: NodeReferenceMap<
      TValueMaker,
      ValueJson<TValueMaker>
    >
  ) {
    this.valueType = valueJson.valueType;
    this.valueMaker = valueJson.valueMaker;
    this.id = valueJson.id; 

    this.valueJson = valueJson;
    this.referencedNodes = referencedNodes;


    this.lookupValueByKey = (key) => {
      //@ts-ignore
      const value = findValueByKey(valueJson.valueMaker, valueJson, referencedNodes, key);
      return value; 
    }
  }

  getValue(): ValueTypeMap[ValueMakersMap[TValueMaker]] {
    throw new NotImplementedError();
  }

  updateValue(v: ValueTypeMap[ValueMakersMap[TValueMaker]]) {
    throw new NotImplementedError();
  }

  getControlConfig(): Array<ControlConfigAndUpdateFunction<ValueTypeMap[ValueMakersMap[TValueMaker]]>> {
    return Object.values(this.referencedNodes).flatMap((v) => {
      if (v !== undefined) {
        // Not sure why the coercion is neccessary.
        return (v as AbstractValueMaker<any>).getControlConfig();
      } else {
        return [];
      }
    });
  }

  toJson(): ValueJson<TValueMaker> {
    return this.valueJson;
  }
}
