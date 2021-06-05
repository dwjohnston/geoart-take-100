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
    
    
    console.log(tickables);

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
    console.log(value);
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

export function getRandomModel(): TheWholeModel {



  const modelDefinition : Array<ValueJson> = [
    {
      valueType: "position",
      valueMaker: "StaticPositionMaker",
      params: {
        value: {
          x:0.5, 
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
    // {
    //   valueType: "number", 
    //   valueMaker: "TickingPhaseMaker", 
    //   params: {
    //     initialValue: 0, 
    //     max: 1, 
    //     step: {
    //       type: "reference", 
    //       reference: "planet-2-speed",
    //     }
    //   },
    //   id: "planet-phase-2"
    // },


    {
      valueType: "number", 
      valueMaker: "StaticNumberMaker", 
      params: {
        value: 0.003
      }, 
      id: 'planet-1-speed', 
    },

    // {
    //   valueType: "number", 
    //   valueMaker: "StaticNumberMaker", 
    //   params: {
    //     value: 0.002
    //   }, 
    //   id: 'planet-2-speed', 
    // },

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
          reference: "planet-phase-1"
        } 
      },
      id: "planet2",
    },
  ];

  const drawMakerConfigs : Array<AbstractDrawItem>= [
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
  ]; 


  const modelMap = constructModelFromJsonArray(modelDefinition);
  const drawMakers = createDrawMakersFromDrawItems(drawMakerConfigs, modelMap); 
  

  const model = new TheWholeModel(modelMap, drawMakers); 

  return model; 

  // const planet1Center = new StaticPositionMaker({ x: 0.5, y: 0.5 });
  // const planet2Center = new StaticPositionMaker({ x: 0.5, y: 0.5 });

  // const planet1Speed = new StaticNumberMaker(0.0025, "p1-speed");
  // const planet1Radius = new StaticNumberMaker(0.15, "p1-radius");
  // const planet1Phase = new TickingPhasingNumberMaker(0, 1, planet1Speed);

  // const planet2Speed = new StaticNumberMaker(0.0035, "p2-speed");
  // const planet2Radius = new StaticNumberMaker(0.35, "p2-radius");
  // const planet2Phase = new TickingPhasingNumberMaker(0, 1, planet2Speed);

  // const planet1Position = new OrbittingPositionMaker(
  //   planet1Center,
  //   planet1Radius,
  //   planet1Speed,
  //   planet1Phase,
  //   "planet1"
  // );
  // const planet2Position = new OrbittingPositionMaker(
  //   planet2Center,
  //   planet2Radius,
  //   planet2Speed,
  //   planet2Phase,
  //   "planet2"
  // );

  // const planet1Drawmaker = new PlanetDrawer(
  //   planet1Center,
  //   planet1Radius,
  //   planet1Position
  // );
  // const planet2Drawmaker = new PlanetDrawer(
  //   planet2Center,
  //   planet2Radius,
  //   planet2Position
  // );
  // const linker = new Linker(planet1Position, planet2Position);

  // const tickables = [
  //   ...planet1Position.getTickables(),
  //   ...planet2Position.getTickables(),
  // ];

  // const controlConfigs = [
  //   ...planet1Position.getControlConfig(),
  //   ...planet2Position.getControlConfig(),
  // ];

  // const drawMakers = [planet1Drawmaker, planet2Drawmaker, linker];

  // return new TheWholeModel(tickables, controlConfigs, drawMakers);
}
