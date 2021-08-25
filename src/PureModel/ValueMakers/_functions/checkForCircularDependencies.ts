import { GeneralError } from "../../../Errors/errors";
import { ValueJson } from "../AbstractValueMaker";
import { createMapFromArray } from "./createMapFromArray";
import { objectIsNodeReference } from "./findValueByKey";

export function checkForCircularDependencies(json: Array<ValueJson<any>>) {
  const map = createMapFromArray(json);

  json.forEach((valueJson) => {
    console.info(`Starting circular dependencies check for: ${valueJson.id}`);

    const recursiveCheck = (
      currentJson: ValueJson<any>,
      foundIds: Record<string, boolean>
    ) => {
      const params = Object.values(currentJson.params);

      params.forEach((param) => {
        if (objectIsNodeReference(param)) {
          if (foundIds[param.reference]) {
            throw new GeneralError("Circular loop detected!", {
              foundIds,
              currentId: param.reference,
            });
          }

          const newFoundIds = {
            ...foundIds,
            [param.reference]: true,
          };
          const newReference = map[param.reference];

          if (!newReference) {
            throw new GeneralError("Referenced node does not exist!", {
              param,
            });
          }

          recursiveCheck(newReference, newFoundIds);
        }
      });
    };

    recursiveCheck(valueJson, {});
  });
}
