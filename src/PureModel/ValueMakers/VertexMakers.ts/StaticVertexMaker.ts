import { Position, Vertex } from "../../ValueTypes";
import {
  AbstractValueMaker,
  ControlConfigAndUpdateFunction,
  NodeReferenceMap,
  ValueJson,
} from "../AbstractValueMaker";

export type StaticVertexMakerTyping = {
  name: "StaticPositionMaker";
  params: {
    pLeft: Vertex;
    pRight: Vertex;
    pVertex: Position;
  };
  valueType: Vertex;
};

export class StaticVertexMaker extends AbstractValueMaker<StaticVertexMakerTyping> {
  private value: Vertex;
  constructor(
    valueJson: ValueJson<StaticVertexMakerTyping["name"]>,
    referenceNodes: NodeReferenceMap<StaticVertexMakerTyping>
  ) {
    super(valueJson, referenceNodes);
    this.value = {
      pLeft: this.lookupValueByKey("pLeft"),
      pRight: this.lookupValueByKey("pRight"),
      pVertex: this.lookupValueByKey("pVertex"),
    };
  }

  updateValue(value: Vertex) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  getControlConfig(): ControlConfigAndUpdateFunction<StaticVertexMakerTyping>[] {
    return [];
  }
}
