import { NotImplementedError } from "../../Errors/errors";
import {
  AbstractControlType,
  ControlConfig,
} from "../../Frontend/Controls/Abstractions";
import {
  findValueByKey,
  IControllable,
  ITickable,
  NodeReferenceMap,
  PossibleValueMakersForValueType,
  ValueJson,
  ValueMakers,
} from "../AbstractModelItem";
import {
  AbstractValueMaker,
  ControlConfigAndUpdateFunction,
} from "./AbstractValueMaker";
import { v4 as uuid } from "uuid";
import { NumberLiteralType } from 'typescript';

// I need a better way to extract that union type.

export type PossibleNumberMakers = "StaticNumberMaker" | "TickingPhaseMaker" | "SineNumberMaker";
export class StaticNumberMaker
  extends AbstractValueMaker<"StaticNumberMaker">
  implements IControllable<number>
{
  private value: number;

  constructor(
    valueJson: ValueJson<"StaticNumberMaker">,
    referencedNodes: NodeReferenceMap<
      "StaticNumberMaker",
      ValueJson<"StaticNumberMaker">
    >
  ) {
    super(valueJson, referencedNodes);
    this.value = findValueByKey(
      "StaticNumberMaker",
      valueJson,
      referencedNodes,
      "value"
    );
  }

  updateValue(value: number) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  getControlConfig(): ControlConfigAndUpdateFunction<number>[] {
    return [
      {
        config: {
          type: "slider",
          id: this.valueJson.id,
          params: {
            label: this.valueJson.id,
            min: 0, // Hard code these for now.  It is not up to the logic model to decide what the mins/maxes are. That is a display overlay question.
            max: 1, // Unless it kind of does makes sense?
            step: 0.01,
            initialValue: findValueByKey(
              "StaticNumberMaker",
              this.valueJson,
              this.referencedNodes,
              "value"
            ),
          },
        },
        updateFn: (value) => this.updateValue(value),
      },
    ];
  }
}

export class PhasingNumberMaker
  extends AbstractValueMaker<"TickingPhaseMaker">
  implements ITickable
{
  private value: number;

  constructor(
    valueJson: ValueJson<"TickingPhaseMaker">,
    referencedNodes: NodeReferenceMap<
      "TickingPhaseMaker",
      ValueJson<"TickingPhaseMaker">
    >
  ) {
    super(valueJson, referencedNodes);

    this.value = findValueByKey(
      "TickingPhaseMaker",
      this.valueJson,
      referencedNodes,
      "initialValue"
    );
  }

  increment(step: number) {


    const max =  findValueByKey(
      "TickingPhaseMaker",
      this.valueJson,
      this.referencedNodes,
      "max"
    );

      
    this.value =(this.value +  step) % max;

    
  }

  tick() {
    this.increment(
      findValueByKey(
        "TickingPhaseMaker",
        this.valueJson,
        this.referencedNodes,
        "step"
      )
    );
  }

  getValue(): number {
    return this.value;
  }
}

export class  SineNumberMaker extends AbstractValueMaker<"SineNumberMaker"> {
  getValue(): number {
    const phase = this.lookupValueByKey("phase"); 
    const amplitude = this.lookupValueByKey("amplitude"); 

    return amplitude * (Math.sin(phase)); 
  }
}


/**
 * Normalizer is a number maker that converts one number into another, in a linear fashion
 * This is useful for converting PI into screen paramters (0-1) for example
 */
export class Normalizer extends AbstractValueMaker<"Normalizer"> {

  getValue() : number {
    const inputValue = this.lookupValueByKey("inputValue"); 
    const numerator = this.lookupValueByKey("numerator");
    const denominator = this.lookupValueByKey("denominator");

    const offset = this.lookupValueByKey("offset"); 

    return (inputValue * (numerator/denominator))+ offset; 
  }
}