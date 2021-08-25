import { GeneralError } from "../../../Errors/errors";
import {
  NodeReference,
  NodeReferenceMap,
  ValueJson,
  ParameterValue,
} from "../AbstractValueMaker";
import { AllValueMakerTypings } from "../ConcreteMap";

export function objectIsValueReference(
  obj: unknown
): obj is ParameterValue<unknown> {
  const _obj = obj as ParameterValue<unknown>;

  //@ts-ignore
  if (typeof _obj === "object" && _obj !== null && _obj.type !== undefined) {
    return true;
  }

  return false;
}

export function objectIsNodeReference(obj: unknown): obj is NodeReference {
  if (objectIsValueReference(obj)) {
    //@ts-ignore
    if (obj.type === "reference") {
      //@ts-ignore
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

// Fair bit of type coercion here, but I think it works
export function findValueByKey<
  TValueMakerTyping extends AllValueMakerTypings,
  TParamKey extends keyof TValueMakerTyping["params"]
>(
  valueJson: ValueJson<TValueMakerTyping["name"]>,
  referenceNodes: NodeReferenceMap<TValueMakerTyping>,
  paramKey: TParamKey
): TValueMakerTyping["params"][TParamKey] {
  //@ts-ignore
  const param = valueJson.params[paramKey];
  if (objectIsValueReference(param)) {
    if (objectIsNodeReference(param)) {
      const referencedNode = referenceNodes[paramKey];

      if (!referencedNode) {
        throw new GeneralError(
          "Something has gone wrong - reference node doesn't exist",
          {
            param,
          }
        );
      }
      //@ts-ignore
      return referencedNode.getValue() as TValueMakerTyping["params"][TParamKey];
    } else {
      //@ts-ignore
      return param.value as TValueMakerTyping["params"][TParamKey];
    }
  } else {
    return param;
  }
}
