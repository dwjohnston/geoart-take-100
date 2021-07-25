import {
  Color,
  findValueByKey,
  IControllable,
  NodeReferenceMap,
  ValueJson,
} from "../AbstractModelItem";
import {
  AbstractValueMaker,
  ControlConfigAndUpdateFunction,
} from "./AbstractValueMaker";

export type PossibleColorMakers = "StaticColorMaker";

export class StaticColorMaker
  extends AbstractValueMaker<"StaticColorMaker">
  implements IControllable<Color>
{
  private r: number;
  private g: number;
  private b: number;
  private a: number;

  constructor(
    valueJson: ValueJson<"StaticColorMaker">,
    referencedNodes: NodeReferenceMap<
      "StaticColorMaker",
      ValueJson<"StaticColorMaker">
    >
  ) {
    super(valueJson, referencedNodes);
    this.r = findValueByKey(
      "StaticColorMaker",
      valueJson,
      referencedNodes,
      "r"
    );

    this.g = findValueByKey(
      "StaticColorMaker",
      valueJson,
      referencedNodes,
      "g"
    );

    this.b = findValueByKey(
      "StaticColorMaker",
      valueJson,
      referencedNodes,
      "b"
    );

    this.a = findValueByKey(
      "StaticColorMaker",
      valueJson,
      referencedNodes,
      "a"
    );
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
      {
        config: {
          type: "color-control",
          id: this.valueJson.id,
          params: {
            label: this.valueJson.id,
            initialValue: {
              r: findValueByKey(
                "StaticNumberMaker",
                //@ts-ignore
                this.valueJson,
                this.referencedNodes,
                "r"
              ),
              g: findValueByKey(
                "StaticNumberMaker",
                //@ts-ignore
                this.valueJson,
                this.referencedNodes,
                "g"
              ),
              b: findValueByKey(
                "StaticNumberMaker",
                //@ts-ignore
                this.valueJson,
                this.referencedNodes,
                "b"
              ),
              a: findValueByKey(
                "StaticNumberMaker",
                //@ts-ignore
                this.valueJson,
                this.referencedNodes,
                "a"
              ),
            },
          },
        },
        updateFn: (value) => this.updateValue(value),
      },
    ];
  }
}
