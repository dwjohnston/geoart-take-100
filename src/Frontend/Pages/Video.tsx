import { useEffect, useRef, useState } from "react";
import { instantiateAlgorithm } from "../../utils/model/AbstractAlgorithm";
import { instantiateModels } from "../../utils/model/mediapipe";
import { DrawingUtils } from "@mediapipe/tasks-vision";
import { XYZTriple } from "../../utils/model/ballBounce";
import {
  drawFaceLandmarks,
  drawHandLandmarks,
} from "../../utils/draw/drawLandmarks";

function relativeDelta(point1: XYZTriple, point2: XYZTriple): XYZTriple {
  const delta_x = point2.x - point1.x;
  const delta_y = point2.y - point1.y;
  const delta_z = point2.z - point1.z;

  return { x: delta_x, y: delta_y, z: delta_z };
}

export function Video() {
  const divRef = useRef<HTMLDivElement>(null);
  const webCamVideoRef = useRef<HTMLVideoElement>(null);

  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const isInstantiated = useRef(false);

  const [showWebcam, setShowWebcam] = useState(true);

  const [debugValue, setDebugValue] = useState(null as any);
  useEffect(() => {
    if (divRef.current && !isInstantiated.current && webCamVideoRef.current) {
      isInstantiated.current = true;

      instantiateModels().then((v) => {
        const [
          faceLandmarker,
          handLandmarker,
          faceDetector,
          objectDetector,
          poseLandmaker,
        ] = v;
        console.log(v);

        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then(function (stream) {
            const video = webCamVideoRef.current;
            const canvas = overlayCanvasRef.current;
            if (video) {
              video.srcObject = stream;

              let lastVideoTime = -1;
              video.addEventListener("loadeddata", () => {
                let canvasWidth = 0;
                let canvasHeight = 0;
                // This just makes the canvas and video the right size.
                // Doesn't really matter main art canvas as we only really care about a 0-1 values.
                if (canvas && divRef.current) {
                  canvasWidth = divRef.current.clientWidth;
                  canvasHeight = divRef.current.clientHeight;

                  const ratio = video.videoHeight / video.videoWidth;
                  const WIDTH_TO_USE = canvasWidth;
                  const HEIGHT_TO_USE = canvasWidth * ratio;
                  video.style.width = WIDTH_TO_USE + "px";
                  video.style.height = HEIGHT_TO_USE + "px";

                  canvas.style.width = WIDTH_TO_USE + "px";
                  canvas.style.height = HEIGHT_TO_USE + "px";
                  canvas.width = video.videoWidth;
                  canvas.height = video.videoHeight;
                  canvasWidth = video.videoWidth;
                  canvasHeight = video.videoHeight;
                }

                const webcamCtx = overlayCanvasRef.current?.getContext("2d");
                const drawingUtils = webcamCtx
                  ? new DrawingUtils(webcamCtx)
                  : null;

                const div = divRef.current;
                if (!div) {
                  throw new Error("Div did not exist");
                }

                instantiateAlgorithm(
                  div,
                  (tickCount) => {
                    const startTimeMs = performance.now();
                    if (lastVideoTime !== video.currentTime) {
                      lastVideoTime = video.currentTime;
                      const faceResults = faceLandmarker.detectForVideo(
                        video,
                        performance.now()
                      );
                      const handResults = handLandmarker.detectForVideo(
                        video,
                        performance.now()
                      );
                      const poseResults = poseLandmaker.detectForVideo(
                        video,
                        performance.now()
                      );

                      if (drawingUtils) {
                        webcamCtx?.clearRect(0, 0, canvasWidth, canvasHeight);
                        drawHandLandmarks(handResults, drawingUtils);
                        drawFaceLandmarks(faceResults, drawingUtils);
                      }

                      if (
                        faceResults &&
                        faceResults.faceLandmarks[0] &&
                        handResults
                      ) {
                        const face = faceResults.faceLandmarks[0];

                        const xTriple = relativeDelta(face[10], face[152]);
                        const yTriple = relativeDelta(face[234], face[454]);
                        const zTriple = relativeDelta(face[4], face[8]);
                        const centerTriple = face[4];

                        let leftCenter,
                          leftSpan,
                          rightCenter,
                          rightSpan,
                          leftElbow,
                          rightElbow,
                          elbowSpan;

                        if (handResults.landmarks[0]) {
                          leftCenter = handResults.landmarks[0][0];
                          leftSpan = relativeDelta(
                            handResults.landmarks[0][4],
                            handResults.landmarks[0][20]
                          );
                        }
                        if (handResults.landmarks[1]) {
                          rightCenter = handResults.landmarks[1][0];
                          rightSpan = relativeDelta(
                            handResults.landmarks[1][4],
                            handResults.landmarks[1][20]
                          );
                        }

                        if (poseResults.landmarks[0]) {
                          leftElbow = poseResults.landmarks[0][13];
                          rightElbow = poseResults.landmarks[0][14];

                          elbowSpan = relativeDelta(leftElbow, rightElbow);
                        }

                        return {
                          xTriple,
                          yTriple,
                          zTriple,
                          centerTriple,
                          leftCenter,
                          rightCenter,
                          leftSpan,
                          rightSpan,
                          leftElbow,
                          rightElbow,
                          elbowSpan,
                        };
                      }
                    }

                    return {};
                  },
                  (value) => {
                    setDebugValue(value);
                  }
                );
              });
            }
          });
      });
    }
  }, []);
  return (
    <div>
      <button onClick={() => setShowWebcam((v) => !v)}>
        {showWebcam ? "Hide Webcam" : "Show Webcam"}
      </button>
      <div className="video-panel">
        <div
          className={`webcam-container ${showWebcam ? "visible" : "hidden"}`}
        >
          <video
            autoPlay
            loop
            controls
            playsInline
            ref={webCamVideoRef}
            muted
          ></video>
          <canvas ref={overlayCanvasRef} />
        </div>
        <div ref={divRef} className="canvas-container"></div>
      </div>
      <details>
        <summary>Info</summary>

        <ul>
          <li>Center planet is centered on face</li>
          <li>Rotate face to change the speed of it</li>
          <li>Other two planets are centered on hands</li>
          <li>Rotate hands to change their speed</li>
        </ul>
      </details>
    </div>
  );
}
