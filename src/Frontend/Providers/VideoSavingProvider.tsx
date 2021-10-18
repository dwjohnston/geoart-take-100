import React, { useRef, useState } from "react";

// TODO find or declare typings
type CanvasCapturer = unknown;

type VideoSaving = {
  registerCanvasElement: (canvasElement: HTMLCanvasElement) => void;
  registerCanvasCapturer: (c: CanvasCapturer) => void;

  canvasElement: HTMLCanvasElement | null;
  canvasCapturer: CanvasCapturer | null;

  random: number;
};

type VideoSavingContextProviderProps = {};

const VideoSavingContext = React.createContext<VideoSaving>({
  registerCanvasElement: () => {},
  registerCanvasCapturer: () => {},

  canvasElement: null,
  canvasCapturer: null,

  random: 0,
});

/** The VideoSavingContext provider needs to serve as way to exchange data between the Canvas and the ImageSaver
 *
 * Order of events:
 *
 * 1. The canvas element mounts
 * 2. The image saver needs access to the canvas element, creates the canvas capturer
 * 3. The Canvas compoent needs access to the canvas capturer
 */

export const VideoSavingContextProvider = (
  props: React.PropsWithChildren<VideoSavingContextProviderProps>
) => {
  const { children } = props;

  const [canvasElement, setCanvasElement] =
    useState<null | HTMLCanvasElement>(null);

  const [canvasCapturer, setCanvasCapturer] =
    useState<null | CanvasCapturer>(null);

  const [randomNumber, setRandomNumber] = useState(0);
  console.log(randomNumber);

  return (
    <VideoSavingContext.Provider
      value={{
        registerCanvasElement: (canvasElement) => {
          console.log(canvasElement);
          setCanvasElement(canvasElement);
          setRandomNumber(Math.random());
        },
        registerCanvasCapturer: (canvasCapturer) => {
          setCanvasCapturer(canvasCapturer);
        },

        random: randomNumber,

        canvasElement,
        canvasCapturer,
      }}
    >
      {randomNumber}
      {children}
    </VideoSavingContext.Provider>
  );
};

export const useVideoSaving = (): VideoSaving => {
  return React.useContext(VideoSavingContext);
};
