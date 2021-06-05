import { AbstractDrawItem, createDrawMakersFromDrawItems } from './AbstractDrawItem';
import { constructModelFromJsonArray } from './AbstractModelItem';
import { Linker } from './DrawMakers/Linker';
import { PlanetDrawer } from './DrawMakers/PlanetDrawer';

describe("createDrawMakersFromDrawItems", () => {
    const modelMap  = constructModelFromJsonArray([
        {
          valueType: "position",
          valueMaker: "StaticPositionMaker",
          params: {
            value: {
              type: "reference",
              reference: "bar",
            },
          },
          id: "foo",
        },
        {
          valueType: "position",
          valueMaker: "StaticPositionMaker",
          params: {
            value: {
              type: "reference",
              reference: "foo",
            },
          },
          id: "foo2",
        },
        {
          valueType: "number",
          valueMaker: "StaticNumberMaker",
          params: {
            value: {
            // @ts-ignore this shouldn't be a problem! :'(
              value: 1
            },
          },
          id: "bar",
        },
      ]);

    it ("returns a list of draw maker class instances", () => {




          const drawItems: Array<AbstractDrawItem> = [{
              drawType: "DrawLinker", 
              params: {
                  p1: "foo",
                  p2: "foo2"
              }
          }, 
          {
            drawType: "DrawPlanet", 
            params: {
                center: "foo",
                orbitSize: "bar", 
                position: "foo2",
            }
        }]

        const result = createDrawMakersFromDrawItems(drawItems, modelMap); 

        expect(result).toHaveLength(2); 
        expect(result[0]).toBeInstanceOf(Linker); 
        expect(result[1]).toBeInstanceOf(PlanetDrawer);
    }); 

    it ("throws an error if a reference node doesn't exist", () => {

          const drawItems: Array<AbstractDrawItem> = [{
              drawType: "DrawLinker", 
              params: {
                  p1: "foo",
                  p2: "foo2"
              }
          }, 
          {
            drawType: "DrawPlanet", 
            params: {
                center: "foo",
                orbitSize: "bar", 
                position: "foasdasdwasdo2",
            }
        }]

        expect(() => createDrawMakersFromDrawItems(drawItems, modelMap)).toThrow();
    }); 


    it.todo("Expect type errors if not all params are defined", () => {

    }); 

    it.todo("Throw errors if not all params are defined/are defined wrong", ()=> {

    }); 
}); 