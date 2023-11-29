import { GeoColorControl } from "./GeoColorControl/GeoColorControl";
import { GeoSlider } from "./GeoSlider/GeoSlider";

export const controlMapping = {
  slider: GeoSlider,
  "color-control": GeoColorControl,
};

export type AbstractControlType = keyof typeof controlMapping;
