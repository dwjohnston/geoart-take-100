import { OrbitingPositionMakerTyping } from "./OrbitingPositionMaker";
import { StaticPositionMakerTyping } from "./StaticPositionMaker";
import { TangentOffsetPositionMakerTyping } from "./TangentOffsetPositionMaker";
import { XYPositionMakerTyping } from "./XYPositionMaker";

export type PossiblePositionMakers =
  | OrbitingPositionMakerTyping
  | StaticPositionMakerTyping
  | TangentOffsetPositionMakerTyping
  | XYPositionMakerTyping;
