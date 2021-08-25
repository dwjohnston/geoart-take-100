import { AbstractValueMaker } from "../AbstractValueMaker";

export type StraightWaveMakerTyping = {
  name: "StraightWaveMaker";
  params: {
    initialValue: number;
    currentPhase: number; //0-1

    amplitude: number; //0-1
    frequency: number; // Number of cycles per 0-1 cycle

    width: number; // 0-1 Width of the top flat part of the wave
    slope: number; // 0-1 Percentage of width to use traverse from bottom flat to top flat
  };
  valueType: number;
};

/**
 StraightWaveMaker allows creating square, triangle and sawtooth waves. 
 */
export class StraightWaveMaker extends AbstractValueMaker<StraightWaveMakerTyping> {
  getValue(): number {
    return 99;
  }
}
