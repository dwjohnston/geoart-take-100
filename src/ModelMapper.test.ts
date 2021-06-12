import { TheWholeModel } from "./ModelMapper";
import { constructModelFromJsonArray } from './PureModel/AbstractModelItem';

describe("TheWholeModel", () => {



  describe("getControlConfigs", () => {

    it("returns the correct configs for a given model definition", () => {

      const modelMap = constructModelFromJsonArray([
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
      ]);

      const model = new TheWholeModel(modelMap, []); 

      const controlConfigs = model.getControlConfigs(); 

      console.log(controlConfigs); 
      expect (controlConfigs).toHaveLength(4); 

      


    });
  });
})