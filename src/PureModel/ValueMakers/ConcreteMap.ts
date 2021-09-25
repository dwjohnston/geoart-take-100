/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * We need to consolidate all of our typings to Classes somewhere, here is that place.
 */

import { OptionHTMLAttributes } from "react";
import { ValueJson } from "./AbstractValueMaker";
import {
  StaticColorMaker,
  StaticColorMakerTyping,
} from "./ColorMakers/StaticColorMaker";

import { Normalizer, NormalizerTyping } from "./NumberMakers/Normalizer";
import {
  PhasingNumberMaker,
  PhasingNumberMakerTyping,
} from "./NumberMakers/PhasingNumberMaker";
import {
  SineNumberMaker,
  SineNumberMakerTyping,
} from "./NumberMakers/SineNumberMaker";
import {
  StaticNumberMaker,
  StaticNumberMakerTyping,
} from "./NumberMakers/StaticNumberMaker";
import {
  StraightWaveMaker,
  StraightWaveMakerTyping,
} from "./NumberMakers/StraightWaveMaker";
import {
  NormaliseByFunctionPositionMaker,
  NormaliseByFunctionPositionMakerTyping,
} from "./PositionMakers/NormaliseByFunctionPositionMaker";

import {
  OrbitingPositionMaker,
  OrbitingPositionMakerTyping,
} from "./PositionMakers/OrbitingPositionMaker";
import {
  StaticPositionMaker,
  StaticPositionMakerTyping,
} from "./PositionMakers/StaticPositionMaker";
import {
  TangentOffsetPositionMaker,
  TangentOffsetPositionMakerTyping,
} from "./PositionMakers/TangentOffsetPositionMaker";
import {
  XYPositionMaker,
  XYPositionMakerTyping,
} from "./PositionMakers/XYPositionMaker";
import {
  StaticVertexMaker,
  StaticVertexMakerTyping,
} from "./VertexMakers.ts/StaticVertexMaker";

export const concreteValueMakerMap = {
  StaticColorMaker: StaticColorMaker,
  Normalizer: Normalizer,
  PhasingNumberMaker: PhasingNumberMaker,
  SineNumberMaker: SineNumberMaker,
  StaticNumberMaker: StaticNumberMaker,
  StraightWaveMaker: StraightWaveMaker,

  OrbitingPositionMaker: OrbitingPositionMaker,
  StaticPositionMaker: StaticPositionMaker,
  TangentOffsetPositionMaker: TangentOffsetPositionMaker,
  XYPositionMaker: XYPositionMaker,
  NormaliseByFunctionPositionMaker: NormaliseByFunctionPositionMaker,

  StaticVertexMaker: StaticVertexMaker,
} as const;

export type AllValueMakerTypings =
  | StaticColorMakerTyping
  | NormalizerTyping
  | PhasingNumberMakerTyping
  | SineNumberMakerTyping
  | StaticNumberMakerTyping
  | StraightWaveMakerTyping
  | OrbitingPositionMakerTyping
  | StaticPositionMakerTyping
  | TangentOffsetPositionMakerTyping
  | XYPositionMakerTyping
  | NormaliseByFunctionPositionMakerTyping
  | StaticVertexMakerTyping;

//Manually declaring the type map.
// There is hopefully a better way to do it.

//https://stackoverflow.com/questions/68917756/reference-an-index-type-while-creating-a-mapped-type

export type TypingsMap = {
  StaticColorMaker: StaticColorMakerTyping;
  Normalizer: NormalizerTyping;
  PhasingNumberMaker: PhasingNumberMakerTyping;
  SineNumberMaker: SineNumberMakerTyping;
  StaticNumberMaker: StaticNumberMakerTyping;
  StraightWaveMaker: StraightWaveMakerTyping;

  OrbitingPositionMaker: OrbitingPositionMakerTyping;
  StaticPositionMaker: StaticPositionMakerTyping;
  TangentOffsetPositionMaker: TangentOffsetPositionMakerTyping;
  XYPositionMaker: XYPositionMakerTyping;
  NormaliseByFunctionPositionMaker: NormaliseByFunctionPositionMakerTyping;
  StaticVertexMaker: StaticVertexMakerTyping;
};

export type TypingsMap2 = {
  foo: {
    name: "foo";
    params: {
      a: number;
      b: string;
    };
  };
  bar: {
    name: "bar";
    params: {
      c: () => "";
      d: string;
    };
  };
};

export type DiscriminatedUnion<
  T extends keyof TypingsMap2 = keyof TypingsMap2
> = {
  [K in keyof TypingsMap2]: TypingsMap2[K];
}[T];
