import React, { useEffect, useRef } from "react";
import { TheWholeModel } from "../../ModelMapper";
import styled from "styled-components";
import { useGlobalControls } from "../Providers/GlobalControlsProvider";

const randInt = () => {
  return Math.floor(Math.random() * 500);
};

export type CanvasProps = {
  model: TheWholeModel;
  onMount: (payload: { resetCallback: () => void }) => void;
};

export const StyledCanvas = styled.div`
  position: relative;
  border: dashed 1px blue;

  height: 500px;
  width: 500px;
  margin: 0 auto;

  > canvas {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
`;

const DRAW_RATE_MS = 1000 / 30;

export const Canvas = (props: CanvasProps) => {
  const { model, onMount } = props;

  const refPaint = useRef<HTMLCanvasElement>(null);
  const refTemp = useRef<HTMLCanvasElement>(null);

  const lastDrawTime = useRef(0);

  const { isPaused } = useGlobalControls();

  useEffect(() => {}, [isPaused]);

  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    console.log("did change");
    console.log(model);

    if (animationFrameRef.current) {
      window.cancelAnimationFrame(animationFrameRef.current);
    }

    if (!refPaint.current) {
      throw new Error("Canvas doesn't exist");
    }

    if (!refTemp.current) {
      throw new Error("Canvas doesn't exist");
    }

    const contextPaint = refPaint.current.getContext("2d");
    if (!contextPaint) {
      throw new Error("Context doesn't exist");
    }

    const contextTemp = refTemp.current.getContext("2d");
    if (!contextTemp) {
      throw new Error("Context doesn't exist");
    }

    if (!isPaused) {
      const draw = (ts: number) => {
        if (ts - lastDrawTime.current > DRAW_RATE_MS) {
          contextTemp.clearRect(0, 0, 500, 500);

          const drawPackage = model.tick();

          drawPackage.temp.forEach((v) => {
            v.draw({
              ctx: contextTemp,
            });
          });

          drawPackage.paint.forEach((v) => {
            v.draw({
              ctx: contextPaint,
            });
          });

          lastDrawTime.current = ts;
        }

        animationFrameRef.current = window.requestAnimationFrame(draw);
      };

      animationFrameRef.current = window.requestAnimationFrame(draw);
    }
  }, [model, isPaused]);

  const resetRef = useRef(() => {
    if (!refPaint.current) {
      throw new Error("Canvas doesn't exist");
    }
    const contextPaint = refPaint.current.getContext("2d");
    if (!contextPaint) {
      throw new Error("Context doesn't exist");
    }

    contextPaint.clearRect(0, 0, 500, 500);
  });

  useEffect(() => {
    onMount({
      resetCallback: resetRef.current,
    });
  }, [onMount]);

  return (
    <StyledCanvas>
      <canvas className="paint-layer" height="500" width="500" ref={refPaint} />
      <canvas className="temp-layer" height="500" width="500" ref={refTemp} />
    </StyledCanvas>
  );
};
