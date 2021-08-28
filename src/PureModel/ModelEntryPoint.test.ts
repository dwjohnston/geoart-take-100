import { TheWholeModel } from "./ModelEntryPoint";
import { constructModelFromJsonArray } from "./ValueMakers/_functions/createModelFromJsonArray";

describe("TheWholeModel", () => {
  describe("getControlConfigs", () => {
    it("returns the correct configs for a given model definition", () => {
      const modelMap = constructModelFromJsonArray([
        {
          valueType: "position",
          valueMakerName: "StaticPositionMaker",
          params: {
            x: 0.5,
            y: 0.5,
          },
          id: "position-center",
        },

        {
          valueType: "number",
          valueMakerName: "PhasingNumberMaker",
          params: {
            initialValue: 0.9,
            max: 1,
            step: {
              type: "reference",
              reference: "planet-1-speed",
            },
          },
          id: "planet-phase-1",
        },
        {
          valueType: "number",
          valueMakerName: "PhasingNumberMaker",
          params: {
            initialValue: 0,
            max: 1,
            step: {
              type: "reference",
              reference: "planet-2-speed",
            },
          },
          id: "planet-phase-2",
        },

        {
          valueType: "number",
          valueMakerName: "StaticNumberMaker",
          params: {
            value: 0.003,
          },
          id: "planet-1-speed",
        },

        {
          valueType: "number",
          valueMakerName: "StaticNumberMaker",
          params: {
            value: 0.002,
          },
          id: "planet-2-speed",
        },

        {
          valueType: "number",
          valueMakerName: "StaticNumberMaker",
          params: {
            value: 0.2,
          },
          id: "planet-1-radius",
        },
        {
          valueType: "number",
          valueMakerName: "StaticNumberMaker",
          params: {
            value: 0.4,
          },
          id: "planet-2-radius",
        },

        {
          valueType: "position",
          valueMakerName: "OrbitingPositionMaker",
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
              reference: "planet-phase-1",
            },
          },
          id: "planet1",
        },
        {
          valueType: "position",
          valueMakerName: "OrbitingPositionMaker",
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
              reference: "planet-phase-2",
            },
          },
          id: "planet2",
        },
      ]);

      const model = new TheWholeModel(modelMap, []);

      const controlConfigs = model.getControlConfigs();

      expect(controlConfigs).toHaveLength(6);
    });
  });
});
