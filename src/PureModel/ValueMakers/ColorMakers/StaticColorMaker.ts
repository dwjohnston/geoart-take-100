import { IControllable } from "../../AbstractModelItem";
import { Color } from "../../ValueTypes";
import {
  AbstractValueMaker,
  ControlConfigAndUpdateFunction,
  NodeReferenceMap,
  ValueJson,
} from "../AbstractValueMaker";

export type StaticColorMakerTyping = {
  name: "StaticColorMaker";
  params: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  valueType: Color;
};

export class StaticColorMaker
  extends AbstractValueMaker<StaticColorMakerTyping>
  implements IControllable<Color>
{
  private r: number;
  private g: number;
  private b: number;
  private a: number;

  constructor(
    valueJson: ValueJson<StaticColorMakerTyping["name"]>,
    referencedNodes: NodeReferenceMap<StaticColorMakerTyping>
  ) {
    super(valueJson, referencedNodes);
    this.r = this.lookupValueByKey("r");
    this.g = this.lookupValueByKey("g");
    this.b = this.lookupValueByKey("b");
    this.a = this.lookupValueByKey("a");
  }

  updateValue(color: Color) {
    const { r, g, b, a } = color;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  getValue() {
    return {
      r: this.r,
      g: this.g,
      b: this.b,
      a: this.a,
    };
  }

  getControlConfig(): ControlConfigAndUpdateFunction<Color>[] {
    // I'm just going to comment this out for this
    // I forget what this function is for
    // Is it the default control config?
    // I don't think it makes sense for that to live in this model
    return [
      // {
      //   config: {
      //     type: "color-control",
      //     id: this.valueJson.id,
      //     params: {
      //       label: this.valueJson.id,
      //       initialValue: {
      //         r: this.lookupValueByKey("r"),
      //         g: this.lookupValueByKey("g"),
      //         b: this.lookupValueByKey("b"),
      //         a: this.lookupValueByKey("a"),
      //       },
      //     },
      //   },
      //   updateFn: (value) => this.updateValue(value),
      // },
    ];
  }
}
