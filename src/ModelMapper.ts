import {
  ITheWholeModel,
  IDrawMaker,
  ITickable,
  IDrawable,
  IControllable,
  DrawPackage,
  ModelMap,
  ValueJson,
  constructModelFromJsonArray,
} from "./PureModel/AbstractModelItem";
import { LinearMover } from "./PureModel/LinearMover";

import {
  AbstractControlId,
  AbstractControlOutput,
  AbstractControlOutputValue,
  ControlHint,

} from "./Frontend/Controls/Abstractions";
import { ControlConfigAndUpdateFunction } from "./PureModel/ValueMakers/AbstractValueMaker";
import { AbstractDrawItem, createDrawMakersFromDrawItems } from './PureModel/AbstractDrawItem';

// const modelMap = {
//   "linear-mover": LinearMover,
//   planet: Planet,
//   linker: Linker,
// } as const;

// type DefinitionItem<T extends keyof typeof modelMap = keyof typeof modelMap> = {
//   [key in T]: {
//     itemKey: T;
//     props: ConstructorParameters<typeof modelMap[T]>;
//   };
// }[T];

// type PossibleDefinitionItem <T extends keyof typeof modelMap> = {
//     [key in T]: DefinitionItem<key>;
// }[T];

// type Definition = Array<DefinitionItem>;

export class TheWholeModel implements ITheWholeModel {
  private _drawmakers: IDrawMaker[] = [];
  private _tickables: ITickable[] = [];
  private _controlConfigs: ControlConfigAndUpdateFunction<unknown>[];

  private _updateFns: Record<
    AbstractControlId,
    (value: AbstractControlOutputValue) => void
  > = {};

  //private controlFlatMap: Record<string, IControllable<unknown>>;

  constructor(
    modelMap: ModelMap,
    drawMakers: Array<IDrawMaker>
  ) {


    const tickables = Object.values(modelMap).filter((v) => {
      //@ts-ignore
      if (v.tick) {
        return true;
      }
    });



    const controlConfigs = Object.values(modelMap).flatMap((v) => {

      return v.getControlConfig();
    });


    //@ts-ignore
    this._tickables = tickables;
    //@ts-ignore
    this._controlConfigs = controlConfigs;
    this._drawmakers = drawMakers;

    this._updateFns = controlConfigs.reduce((acc, cur) => {
      return {
        ...acc,
        [cur.config.id]: cur.updateFn,
      };
    }, {});
  }

  tick() {
    this._tickables.forEach((v) => {
      v.tick();
    });

    return this._drawmakers.reduce(
      (acc, cur) => {
        const drawPackage = cur.getDrawables();
        return {
          temp: [...acc.temp, ...drawPackage.temp],
          paint: [...acc.paint, ...drawPackage.paint],
        };
      },
      { temp: [], paint: [] } as DrawPackage
    );
  }

  updateProperty(value: AbstractControlOutput<AbstractControlId, unknown>) {
    this._updateFns[value.id](value.value);
  }

  getControlConfigs(): ControlConfigAndUpdateFunction<unknown>[] {

    return this._controlConfigs;
  }
}

/**
 * The thing that is returned from this, needs to: 
 * 
 *  1. Regularly tick the quartz
 *  2. After each tick, retrieve the drawables
 *  3. Declare a list of controllers to put on the FE.  
 *  4. Respond to property update events. 
 * @param definition 
//  */
// export function createModelFromDefinition(definition: Definition) : TheWholeModel{

//     return new TheWholeModel(definition);

// }


type ModelPackage = {
  modelDefinition: Array<any>;
  drawMakers: Array<any>;
  controlHints: Array<ControlHint>;
}


export const preBuiltModels: Record<string, ModelPackage> = {
  "earth-venus": {
    modelDefinition: [
      {
        valueType: "position",
        valueMaker: "StaticPositionMaker",
        params: {
          value: {
            x: 0.5,
            y: 0.5,
          }
        },
        id: "position-center",
      },



      {
        valueType: "number",
        valueMaker: "TickingPhaseMaker",
        params: {
          initialValue: 0.9,
          max: 1,
          step: {
            type: "reference",
            reference: "planet-1-speed",
          }
        },
        id: "planet-phase-1"
      },
      {
        valueType: "number",
        valueMaker: "TickingPhaseMaker",
        params: {
          initialValue: 0,
          max: 1,
          step: {
            type: "reference",
            reference: "planet-2-speed",
          }
        },
        id: "planet-phase-2"
      },


      {
        valueType: "number",
        valueMaker: "StaticNumberMaker",
        params: {
          value: 0.003
        },
        id: 'planet-1-speed',
      },

      {
        valueType: "number",
        valueMaker: "StaticNumberMaker",
        params: {
          value: 0.002
        },
        id: 'planet-2-speed',
      },

      {
        valueType: "number",
        valueMaker: "StaticNumberMaker",
        params: {
          value: 0.2
        },
        id: 'planet-1-radius',
      },
      {
        valueType: "number",
        valueMaker: "StaticNumberMaker",
        params: {
          value: 0.4
        },
        id: 'planet-2-radius',
      },

      {
        valueType: "position",
        valueMaker: "OrbitingPositionMaker",
        params: {
          center: {
            type: "reference",
            reference: "position-center",

          },
          radius: {
            type: "reference",
            reference: "planet-1-radius",
          },

          phase: {
            type: "reference",
            reference: "planet-phase-1"
          }
        },
        id: "planet1",
      },
      {
        valueType: "position",
        valueMaker: "OrbitingPositionMaker",
        params: {
          center: {
            type: "reference",
            reference: "position-center",

          },
          radius: {
            type: "reference",
            reference: "planet-2-radius",
          },

          phase: {
            type: "reference",
            reference: "planet-phase-2"
          }
        },
        id: "planet2",
      },
    ],
    drawMakers: [
      {
        drawType: "DrawLinker",
        params: {
          p1: {
            type: "reference",
            reference: "planet1",
          },
          p2: {
            type: "reference",
            reference: "planet2",
          },
        }
      },
      {
        drawType: "DrawPlanet",
        params: {
          center: {
            type: "reference",
            reference: "position-center",
          },
          position: {
            type: "reference",
            reference: "planet1",
          },
          orbitSize: {
            type: "reference",
            reference: "planet-1-radius",
          },
        }
      },
      {
        drawType: "DrawPlanet",
        params: {
          center: {
            type: "reference",
            reference: "position-center",
          },
          position: {
            type: "reference",
            reference: "planet2",
          },
          orbitSize: {
            type: "reference",
            reference: "planet-2-radius",
          },
        }
      }
    ],
    controlHints: [
      {
        valueMakerId: "planet-1-speed",
        controlType: "slider",
        params: {
          label: "Planet 1 Speed",
          min: -0.01,
          max: 0.01,
          step: 0.001,
          initialValue: 0.01,

        },
        visible: true,

      },
      {
        valueMakerId: "planet-2-speed",
        controlType: "slider",
        params: {
          label: "Planet 2 Speed",
          min: -0.01,
          max: 0.01,
          step: 0.001,
          initialValue: -0.01,

        },
        visible: true,
      },
      {
        valueMakerId: "planet-1-radius",
        controlType: "slider",
        params: {
          label: "Planet 1 Radius",
          min: 0,
          max: 0.5,
          step: 0.01,
          initialValue: 0.3,

        },
        visible: true,

      },
      {
        valueMakerId: "planet-2-radius",
        controlType: "slider",
        params: {
          label: "Planet 2 Radius",
          min: 0,
          max: 0.5,
          step: 0.01,
          initialValue: 0.5,

        },
        visible: true,
      },



    ],

  },
  "simple-sine": {
    modelDefinition: [

      {
        valueType: "number",
        valueMaker: "TickingPhaseMaker",
        params: {
          initialValue: 0,
          max: 1,
          step: 0.015,
        },
        id: "phase"
      },

      {
        valueType: "number",
        valueMaker: "StaticNumberMaker",
        params: {
          value: 0.2
        },
        id: 'frequency',
      },

      {
        valueType: "number",
        valueMaker: "Normalizer",
        params: {
          offset: 0,
          numerator: {
            type: "reference",
            reference: "phase"
          },
          denominator: 1,
          inputValue: {
            type: "reference",
            reference: "frequency"
          }
        },
        id: "adjusted-phase-a"
      },

      {
        valueType: "number",
        valueMaker: "Normalizer",
        params: {
          offset: 0,
          numerator: Math.PI *2,
          denominator: 1,
          inputValue: {
            type: "reference",
            reference: "adjusted-phase-a"
          }
        },
        id: "adjusted-phase-b"
      },
      

      {
        valueType: "number",
        valueMaker: "SineNumberMaker",
        params: {
          phase: {
            type: "reference",
            reference: "adjusted-phase-b"
          },
          amplitude: 0.5
        },
        id: "sine-value",
      },

      {
        valueType: "number",
        valueMaker: "Normalizer",
        params: {
          offset: 0.5,
          numerator: 1,
          denominator: 1,
          inputValue: {
            type: "reference",
            reference: "sine-value"
          }
        },
        id: "y"
      },

      {
        valueType: "position",
        valueMaker: "XYPositionMaker",
        params: {
          x: {
            type: "reference",
            reference: "phase"
          },
          y: {
            type: "reference",
            reference: "y"
          },
        },
        id: "position"
      }

    ],
    drawMakers: [{
      drawType: "DrawDot",
      params: {
        p1: {
          type: "reference",
          reference: "position",
        },

      }
    },],
    controlHints: [
      {
        valueMakerId: "frequency",
        controlType: "slider",
        params: {
          label: "Frequency",
          min: 0.01,
          max: 10,
          step: 0.1,
          initialValue: 1,

        },
        visible: true,

      },
    ],

  },
  "double-sine": {
    modelDefinition: [

      {
        valueType: "number",
        valueMaker: "StaticNumberMaker",
        params: {
          value: 0.2
        },
        id: 'frequency-1',
      },

      {
        valueType: "number",
        valueMaker: "TickingPhaseMaker",
        params: {
          initialValue: 0,
          max: 1,
          step: 0.01
        },
        id: "phase-1"
      },

      {
        valueType: "number",
        valueMaker: "Normalizer",
        params: {
          offset: 0,
          numerator: {
            type: "reference", 
            reference: "frequency-1"
          },
          denominator: 1/(Math.PI * 2),
          inputValue: {
            type: "reference",
            reference: "phase-1"
          }
        },
        id: "adjusted-phase-1"
      },


      {
        valueType: "number",
        valueMaker: "SineNumberMaker",
        params: {
          phase: {
            type: "reference",
            reference: "adjusted-phase-1"
          },
          amplitude: 0.5
        },
        id: "sine-value-1",
      },

      {
        valueType: "number",
        valueMaker: "Normalizer",
        params: {
          offset: 0.5,
          numerator: 1, 
          denominator: 1, 
          inputValue: {
            type: "reference",
            reference: "sine-value-1"
          }
        },
        id: "y-1"
      },

      {
        valueType: "position",
        valueMaker: "XYPositionMaker",
        params: {
          x: {
            type: "reference",
            reference: "phase-1"
          },
          y: {
            type: "reference",
            reference: "y-1"
          },
        },
        id: "position-1"
      },


      // Number 2
      {
        valueType: "number",
        valueMaker: "StaticNumberMaker",
        params: {
          value: 0.3
        },
        id: 'frequency-2',
      },

      {
        valueType: "number",
        valueMaker: "TickingPhaseMaker",
        params: {
          initialValue: 0,
          max: 1,
          step: 0.01
        },
        id: "phase-2"
      },

      {
        valueType: "number",
        valueMaker: "Normalizer",
        params: {
          offset: 0,
          numerator: {
            type: "reference", 
            reference: "frequency-2"
          },
          denominator: 1/(Math.PI * 2),
          inputValue: {
            type: "reference",
            reference: "phase-2"
          }
        },
        id: "adjusted-phase-2"
      },
      {
        valueType: "number",
        valueMaker: "SineNumberMaker",
        params: {
          phase: {
            type: "reference",
            reference: "adjusted-phase-2"
          },
          amplitude: 0.5
        },
        id: "sine-value-2",
      },

      {
        valueType: "number",
        valueMaker: "Normalizer",
        params: {
          offset: 0.5,
          numerator: 1, 
          denominator: 1, 
          inputValue: {
            type: "reference",
            reference: "sine-value-2"
          }
        },
        id: "y-2"
      },

      {
        valueType: "position",
        valueMaker: "XYPositionMaker",
        params: {
          x: {
            type: "reference",
            reference: "phase-2"
          },
          y: {
            type: "reference",
            reference: "y-2"
          },
        },
        id: "position-2"
      }

    ],
    drawMakers: [{
      drawType: "DrawDot",
      params: {
        p1: {
          type: "reference",
          reference: "position-1",
        },

      }
    },

    {
      drawType: "DrawDot",
      params: {
        p1: {
          type: "reference",
          reference: "position-2",
        },

      }
    },

    {
      drawType: "DrawLinker",
      params: {
        p1: {
          type: "reference",
          reference: "position-1",
        },
        p2: {
          type: "reference",
          reference: "position-2",
        },
      }
    },
    ],
    controlHints: [
      {
        valueMakerId: "frequency-1",
        controlType: "slider",
        params: {
          label: "Frequency",
          min: 0.01,
          max: 10,
          step: 0.1,
          initialValue: 1,

        },
        visible: true,

      },
      {
        valueMakerId: "frequency-2",
        controlType: "slider",
        params: {
          label: "Frequency",
          min: 0.01,
          max: 10,
          step: 0.1,
          initialValue: 1,

        },
        visible: true,

      },
    ],

  }
}


export function getModel(modelName: keyof typeof preBuiltModels): {
  model: TheWholeModel,
  controlHints: Array<ControlHint>
} {


  const prebuiltModel = preBuiltModels[modelName];
  const { modelDefinition, drawMakers, controlHints } = prebuiltModel;


  //@ts-ignore
  const modelMap = constructModelFromJsonArray(modelDefinition);
  //@ts-ignore
  const drawMakersObjects = createDrawMakersFromDrawItems(drawMakers, modelMap);


  const model = new TheWholeModel(modelMap, drawMakersObjects);

  return { model, controlHints };

}
