//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision
export function toSignificantFigures(value: number, sf: number) {
  return Number.parseFloat(value.toPrecision(sf));
}
