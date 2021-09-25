import { ValueJson } from "../AbstractValueMaker";

export function createMapFromArray(
  json: Array<ValueJson<any>>
): Record<string, ValueJson<any>> {
  return json.reduce((acc, cur) => {
    if (acc[cur.id]) {
      throw new Error("Duplicate key detected");
    }
    return {
      ...acc,
      [cur.id]: cur,
    };
  }, {} as Record<string, ValueJson<any>>);
}
