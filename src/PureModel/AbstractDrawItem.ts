import {
  ModelMap,
  IDrawMaker,
  getValueMakerFromReferenceNode,
} from "./AbstractModelItem";
import { NodeReference } from "./ValueMakers/AbstractValueMaker";
import { BallDrawer } from "./DrawMakers/BallDrawer";
import { DotMaker } from "./DrawMakers/DotMaker";
import { Linker } from "./DrawMakers/Linker";
import { PlanetDrawer } from "./DrawMakers/PlanetDrawer";

export const DrawMakingMap = {
  DrawLinker: Linker,
  DrawPlanet: PlanetDrawer,
  DrawDot: DotMaker,
  DrawBall: BallDrawer,
};

export type PossibleDrawTypes = keyof typeof DrawMakingMap;

type PossibleAllConstructorParams<T extends keyof typeof DrawMakingMap> =
  ConstructorParameters<typeof DrawMakingMap[T]>;

type PossibleParams<T extends keyof typeof DrawMakingMap> =
  PossibleAllConstructorParams<T>[0];

export type AbstractDrawItem<
  TDrawType extends PossibleDrawTypes = PossibleDrawTypes
> = {
  drawType: TDrawType;
  params: {
    [K in keyof PossibleParams<TDrawType>]: NodeReference;
  };
};

export function createDrawMakersFromDrawItems(
  drawItems: Array<AbstractDrawItem>,
  modelMap: ModelMap
): Array<IDrawMaker> {
  const drawMakers = drawItems.map((v) => {
    const entries = Object.entries(v.params) as Array<[string, NodeReference]>;

    const params = entries.reduce((acc, [key, value]) => {
      const node = getValueMakerFromReferenceNode(value, modelMap);

      return {
        ...acc,
        [key]: node,
      };
    }, {});

    const DrawMakerClass = DrawMakingMap[v.drawType];
    // @ts-ignore pretty sure this is fine
    const DrawMaker = new DrawMakerClass(params);

    return DrawMaker;
  });

  return drawMakers;
}
