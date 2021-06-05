import React, { useEffect, useRef } from "react";
import { TheWholeModel } from "../../ModelMapper";
import styled from "styled-components";

const randInt = () => {
  return Math.floor(Math.random() * 500);
};

type CanvasProps = {
  model: TheWholeModel;
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

const DRAW_RATE_MS = 1000/10; 


export const Canvas = (props: CanvasProps) => {
  const { model } = props;

  const refPaint = useRef<HTMLCanvasElement>(null);
  const refTemp = useRef<HTMLCanvasElement>(null);


  const lastDrawTime = useRef(0);

  useEffect(() => {
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

    const contextTemp = refPaint.current.getContext("2d");
    if (!contextTemp) {
      throw new Error("Context doesn't exist");
    }

    const draw = (ts :number) => {

      if ((ts - lastDrawTime.current) > DRAW_RATE_MS) {
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

      window.requestAnimationFrame(draw);
    };

    window.requestAnimationFrame(draw);
  }, [model]);

  return (
    <StyledCanvas>
      <canvas className="paint-layer" height="500" width="500" ref={refPaint} />
      <canvas className="temp-layer" height="500" width="500" ref={refTemp} />
    </StyledCanvas>
  );
};
