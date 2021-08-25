import { GeneralError } from "../../../Errors/errors";
import {
  NodeReference,
  NodeReferenceMap,
  ValueJson,
  ValueMakerTyping,
  ValueReference,
} from "../AbstractValueMaker";

export function objectIsValueReference(
  obj: unknown
): obj is ValueReference<unknown> {
  const _obj = obj as ValueReference<unknown>;

  if (typeof _obj === "object" && _obj !== null && _obj.type !== undefined) {
    return true;
  }

  return false;
}

export function objectIsNodeReference(obj: unknown): obj is NodeReference {
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

// Fair bit of type coercion here, but I think it works
export function findValueByKey<
  TValueMakerTyping extends ValueMakerTyping,
  TParamKey extends keyof TValueMakerTyping["params"]
>(
  valueJson: ValueJson<TValueMakerTyping>,
  referenceNodes: NodeReferenceMap<TValueMakerTyping>,
  paramKey: TParamKey
): TValueMakerTyping["params"][TParamKey] {
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
      return referencedNode.getValue() as TValueMakerTyping["params"][TParamKey];
    } else {
      return param.value as TValueMakerTyping["params"][TParamKey];
    }
  } else {
    return param;
  }
}
