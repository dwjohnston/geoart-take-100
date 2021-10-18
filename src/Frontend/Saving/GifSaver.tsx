import React, { useEffect, useRef, useState } from "react";

import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import * as CanvasCapture from "canvas-capture";

import { StyledButton } from "./GifSaver.style";
import { useUserPreferences } from "../Providers/UserPreferencesProvider";
import { useVideoSaving } from "../Providers/VideoSavingProvider";

export type GifSaverProps = {};

export const GifSaver = (props: GifSaverProps) => {
  const { canvasElement, registerCanvasCapturer, random } = useVideoSaving();

  const [isRecording, setIsRecording] = useState(false);

  const { setPreference } = useUserPreferences();

  // const handleRecordToggleClick = () => {
  //   console.log(canvasElement, random);

  //   setIsRecording(!isRecording);

  // }

  // console.log(canvasElement, random);

  // useEffect(() => {

  //   console.log(canvasElement, random);
  //     if (isRecording) {
  //       setPreference("isPaused", false);

  //     }
  // }, [isRecording]);

  // useEffect(() => {

  //   console.log(canvasElement);
  //   if (canvasElement) {
  //     CanvasCapture.init(canvasElement);
  //     registerCanvasCapturer(CanvasCapture);
  //   }
  // }, [canvasElement]);

  return (
    <div>
      {random}
      {/* <StyledButton onClick={handleRecordToggleClick} className={isRecording ? "recording" : "not-recording"}><FiberManualRecordIcon /> </StyledButton> */}
    </div>
  );
};
