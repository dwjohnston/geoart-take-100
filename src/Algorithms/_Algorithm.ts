import { ControlHint } from "../Frontend/Controls/Abstractions";
import { AbstractDrawItem } from "../PureModel/AbstractDrawItem";
import { ValueJson } from "../PureModel/ValueMakers/AbstractValueMaker";
import { AllValueMakerTypings } from "../PureModel/ValueMakers/ConcreteMap";

export type Algorithm = {
  name: string;
  modelDefinition: Array<ValueJson>;
  drawMakers: Array<AbstractDrawItem>;
  controlHints: Array<ControlHint>;
};
