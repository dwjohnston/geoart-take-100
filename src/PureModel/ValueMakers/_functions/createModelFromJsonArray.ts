/* eslint-disable no-loop-func */
import { partition } from "../../../utils/partition";
import { ModelMap } from "../../AbstractModelItem";
import { ValueJson } from "../AbstractValueMaker";
import { checkForCircularDependencies } from "./checkForCircularDependencies";
import {
  objectIsNodeReference,
  objectIsValueReference,
} from "./findValueByKey";

function constructSingleModelItemFromJson(
  valueJson: ValueJson<any>,
  dependencyNodes: any = {} // I'm getting lazy
) {
  try {
    const Class = ValueMakersConstructorMap[valueJson.valueMaker];
    //@ts-ignore - obvs I need to sort this.
    return new Class(valueJson, dependencyNodes);
  } catch (err) {
    throw new GeneralError(err.message, { valueJson });
  }
}

export function constructModelFromJsonArray(
  json: Array<ValueJson<any>>
): ModelMap {
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
      if (objectIsNodeReference(v)) {
        return !!map[v.reference];
      } else {
        return true;
      }
    });

    if (readyToCreate) {
      const paramClassInstances = Object.entries(valueJson.params).reduce(
        (acc, [key, param]) => {
          if (objectIsNodeReference(param)) {
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
