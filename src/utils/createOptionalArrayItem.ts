import { isArrayBindingPattern } from "typescript";

/**
 * Usage:
 *
 * const myArray = [
 *     "a",
 *     "b",
 *     ...createOptionalArrayItem(someCondition, "c");
 * ]
 *
 *
 * @param doCreate
 * @param item
 * @returns
 */

export function createOptionalArrayItem<T>(
  doCreate: boolean | undefined,
  item: T | Array<T>
) {
  if (doCreate) {
    if (Array.isArray(item)) {
      return item;
    } else {
      return [item];
    }
  } else {
    return [];
  }
}
