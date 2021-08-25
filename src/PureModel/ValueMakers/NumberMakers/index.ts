import { NormalizerTyping } from "./Normalizer";
import { PhasingNumberMakerTyping } from "./PhasingNumberMaker";
import { SineNumberMakerTyping } from "./SineNumberMaker";
import { StaticNumberMakerTyping } from "./StaticNumberMaker";
import { StraightWaveMakerTyping } from "./StraightWaveMaker";

export type PossibleNumberMakers =
  | PhasingNumberMakerTyping
  | NormalizerTyping
  | SineNumberMakerTyping
  | StaticNumberMakerTyping
  | StraightWaveMakerTyping;
