import { AbstractValueMaker } from "../AbstractValueMaker";

export type StraightWaveMakerTyping = {
  name: "StraightWaveMaker";
  params: {
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
  // Straight up copying this from here:
  //https://github.com/dwjohnston/OscProject/blob/master/src/dspComponents/Osc.java

  getValue(): number {
    const phase = this.lookupValueByKey("currentPhase");

    const amplitude = this.lookupValueByKey("amplitude");
    const frequency = this.lookupValueByKey("frequency");
    const width = this.lookupValueByKey("width");
    const slope = this.lookupValueByKey("slope");

    const oneCycleLength = 1 / frequency;

    //Normalise the phase to a value 0-1, within a single cycle
    const currentPlaceInCycle = (phase % oneCycleLength) / oneCycleLength;
    const p2 = width;
    const p1 = p2 * slope;
    const p3 = p2 + (1 - p2) * slope;

    let rawValue = 0;
    if (currentPlaceInCycle < p1) {
      rawValue = -1 + (2 / p1) * currentPlaceInCycle;
      // rawValue = -0.5;
    } else if (currentPlaceInCycle >= p1 && currentPlaceInCycle < p2) {
      rawValue = 1;
    } else if (currentPlaceInCycle >= p2 && currentPlaceInCycle < p3) {
      rawValue = 1 + (-2 / (p3 - p2)) * (currentPlaceInCycle - p2);
      // rawValue = 0.5
    } else {
      rawValue = -1;
    }

    return rawValue * amplitude;
  }
}
