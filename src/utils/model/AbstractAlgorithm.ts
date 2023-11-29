import {
  FaceDetector,
  FaceLandmarker,
  HandLandmarker,
  NormalizedLandmark,
  ObjectDetector,
  PoseLandmarker,
} from "@mediapipe/tasks-vision";
import { XYPair, XYZTriple } from "./ballBounce";
import { drawCircle, drawLine } from "../draw/drawSimpleShapes";

import {
  ThreePlanet,
  Face,
  TheWholeModel,
  constructModelFromJsonArray,
  createDrawMakersFromDrawItems,
} from "../../export";

type MediapipeModels = {
  faceLandmarker: FaceLandmarker;
  handLandmarker: HandLandmarker;
  faceDetector: FaceDetector;
  objectDetector: ObjectDetector;
  poseLandmaker: PoseLandmarker;
};

export type AbstractAlgorithmInput = {
  /**
   * The source video for controlling inputs
   */
  video: HTMLVideoElement;

  /**
   *  The main canvas output
   */
  artCanvas: HTMLCanvasElement;

  /**
   * Optional debug canvas
   */
  debugCanvas?: HTMLCanvasElement;

  /**
   * Mediapipe models
   */
  mediapipe: MediapipeModels;

  /**
   * Optional function provide debug information to the rest of the application
   * @param value
   * @returns
   */
  debugCallback?: (value: unknown) => void;
};

/**
 * A function that should be called once, and then returns a recursive animation loop function
 */
export type AbstractAlgorithm = (input: AbstractAlgorithmInput) => () => void;

function normalise(
  min: number,
  max: number,
  value: number,
  sourceMin = 0,
  sourceMax = 1
) {
  const diff = max - min;

  const sourceDiff = sourceMax - sourceMin;
  const sourceProgress = value - sourceMin;
  const adjustedSourceValue = sourceProgress / sourceDiff;

  const dValue = diff * adjustedSourceValue;
  return min + dValue;
}

type AlgorithmParameters = {
  xTriple?: XYZTriple;
  yTriple?: XYZTriple;
  zTriple?: XYZTriple;

  centerTriple?: XYZTriple;

  leftCenter?: XYZTriple;
  rightCenter?: XYZTriple;

  leftSpan?: XYZTriple;
  rightSpan?: XYZTriple;

  leftElbow?: XYZTriple;
  rightElbow?: XYZTriple;
  elbowSpan?: XYZTriple;
};
/**
 *
 * @param div - A div element. Should be relatively positioned.
 * @param parameterUpdate A callback to provided any external parameters to the algorithm.
 */

export function instantiateAlgorithm(
  div: HTMLDivElement,
  parameterUpdate: (tickCount: number) => AlgorithmParameters,
  debug: (value: unknown) => void
) {
  const modelMap = constructModelFromJsonArray(Face.modelDefinition);
  const drawMakersObjects = createDrawMakersFromDrawItems(
    Face.drawMakers,
    modelMap
  );

  const model = new TheWholeModel(modelMap, drawMakersObjects);

  const canvasPerm = document.createElement("canvas");
  const canvasTemp = document.createElement("canvas");

  const WIDTH = div.clientWidth;
  const HEIGHT = div.clientHeight;

  canvasPerm.height = HEIGHT;
  canvasPerm.width = WIDTH;

  canvasTemp.height = HEIGHT;
  canvasTemp.width = WIDTH;

  div.appendChild(canvasPerm);
  div.appendChild(canvasTemp);

  const ctxPerm = canvasPerm.getContext("2d");
  const ctxTemp = canvasTemp.getContext("2d");

  let frameCount = 0;

  function draw() {
    const debugStack = [];
    const params = parameterUpdate(frameCount);

    if (!ctxPerm || !ctxTemp) {
      throw new Error("Canvas contexts did not exist");
    }

    ctxTemp.clearRect(0, 0, WIDTH, HEIGHT);

    if (params.centerTriple) {
      model.updateProperty({
        id: "position-center-x",
        value: params.centerTriple.x,
      });
      model.updateProperty({
        id: "position-center-y",
        value: params.centerTriple.y,
      });
    }

    if (params.yTriple) {
      model.updateProperty({
        id: "planet-1-speed",
        value: params.yTriple.y,
      });
    }

    if (params.leftCenter) {
      model.updateProperty({
        id: "planet-left-center-x",
        value: params.leftCenter.x,
      });
      model.updateProperty({
        id: "planet-left-center-y",
        value: params.leftCenter.y,
      });
    }

    if (params.rightCenter) {
      model.updateProperty({
        id: "planet-right-center-x",
        value: params.rightCenter.x,
      });
      model.updateProperty({
        id: "planet-right-center-y",
        value: params.rightCenter.y,
      });
    }

    if (params.leftSpan) {
      model.updateProperty({
        id: "planet-left-radius",
        value: Math.abs(normalise(0.01, 0.3, params.leftSpan.x, -0.1, 0.1)),
      });

      model.updateProperty({
        id: "planet-left-speed",
        value: params.leftSpan.z,
      });
    }
    if (params.rightSpan) {
      model.updateProperty({
        id: "planet-right-radius",
        value: Math.abs(normalise(0.01, 0.3, params.rightSpan.x, -0.1, 0.1)),
      });
      model.updateProperty({
        id: "planet-right-speed",
        value: params.rightSpan.z,
      });
    }

    const drawPackage = model.tick();
    drawPackage.temp.forEach((v) => {
      v.draw({ ctx: ctxTemp });
    });
    drawPackage.paint.forEach((v) => {
      v.draw({ ctx: ctxPerm });
    });

    frameCount++;

    debug(params);
    requestAnimationFrame(draw);
  }

  draw();
}

// export function instantiateAlgorithm(div: HTMLDivElement, parameterUpdate: (tickCount: number) => AlgorithmParameters) {

//     const canvas1 = document.createElement("canvas");
//     const canvas2 = document.createElement("canvas");

//     const WIDTH = div.clientHeight;
//     const HEIGHT = div.clientHeight;

//     canvas1.height = HEIGHT;
//     canvas1.width = WIDTH;

//     canvas2.height = HEIGHT;
//     canvas2.width = WIDTH;

//     div.appendChild(canvas1);
//     div.appendChild(canvas2);

//     const ctxPerm = canvas1.getContext("2d");
//     const ctxTemp = canvas2.getContext("2d");

//     function normalisePoint(point: XYPair): XYPair {
//         return {
//             x: Math.floor(point.x * WIDTH),
//             y: Math.floor(point.y * HEIGHT),
//         }
//     }

//     let tickCount = 0;

//     const p1 = {
//         center: {
//             x: 0.5,
//             y: 0.5
//         },
//         size: {
//             x: 0.5,
//             y: 0.5,
//         },
//         speed: 0.001,
//         phase: 0
//     }

//     const p2 = {
//         center: {
//             x: 0.5,
//             y: 0.5
//         },
//         size: {
//             x: 0.5,
//             y: 0.5,
//         },
//         speed: 0.002,
//         phase: 0
//     }

//     const SHIFT_VALUE = 0.01;

//     const p1TargetCenter = {
//         x: 0.5,
//         y: 0.5
//     }

//     const p2TargetCenter = {
//         x: 0.5,
//         y: 0.5,
//     }

//     const p1TargetSize = {
//         x: 0.5,
//         y: 0.5
//     }

//     let p1TargetSpeed = 0.001;

//     const p2TargetSize = {
//         x: 0.5,
//         y: 0.5,
//     }

//     const TEMP_COLOR = "#ffffff70"
//     const DEBUG_COLOR = "#ff000070"

//     /**
//      *
//      * @param min Any range you want to spread a value over
//      * @param max Any range you want to spread a value over
//      * @param value A value between 0 & 1
//      * @returns A value between min and max
//      */
//     function normalise(min: number, max: number, value: number) {
//         const diff = max - min;
//         const dValue = diff * value;
//         return min + dValue;
//     }

//     function draw() {

//         if(!ctxPerm || !ctxTemp){
//             throw new Error("Canvas rendering contexts did not exist")
//         }

//         ctxTemp.clearRect(0, 0, WIDTH, HEIGHT);

//         const params = parameterUpdate(tickCount);

//         p1TargetCenter.x = params.nose.x;
//         p1TargetCenter.y = params.nose.y;

//         p1TargetSize.x = Math.abs(0.5 - params.leftThumb.x);
//         p1TargetSize.y = Math.abs(0.5 - params.leftThumb.y);

//         p1TargetSpeed = normalise(0.001, 0.005, params.leftThumb.z);

//         p1.center.x = (p1.center.x + p1TargetCenter.x) * 0.49;
//         p1.center.y = (p1.center.y + p1TargetCenter.y) * 0.49;

//         p1.size.x = (p1.size.x + p1TargetSize.x) * 0.49;
//         p1.size.y = (p1.size.y + p1TargetSize.y) * 0.49;

//         p1.speed = (p1.speed + p1TargetSpeed) * 0.49;

//         const p1Position = {
//             x:  Math.cos(Math.PI * 2 * p1.phase) * p1.size.x + p1.center.x,
//             y:  Math.sin(Math.PI * 2 * p1.phase) * p1.size.y + p1.center.y,
//         }

//         const p2Position = {
//             x:  Math.cos(Math.PI * 2 * p2.phase) * p2.size.x + p2.center.x,
//             y:  Math.sin(Math.PI * 2 * p2.phase) * p2.size.y + p2.center.y,
//         }

//         drawCircle(ctxTemp, {...normalisePoint(p1.center), color: TEMP_COLOR}, normalisePoint(p1.size));
//         drawCircle(ctxTemp, {... normalisePoint(p1Position), color: TEMP_COLOR}, {x: 10, y: 10});

//         drawCircle(ctxTemp, {...normalisePoint(params.leftThumb), color: DEBUG_COLOR}, {x: 10, y: 10});
//         drawCircle(ctxTemp, {...normalisePoint(params.rightThumb), color: DEBUG_COLOR}, {x: 10, y: 10});
//         drawCircle(ctxTemp, {...normalisePoint(params.nose), color: DEBUG_COLOR}, {x: 10, y: 10});

//         drawCircle(ctxTemp, {...normalisePoint(p2.center), color: TEMP_COLOR}, normalisePoint(p2.size));
//         drawCircle(ctxTemp, {... normalisePoint(p2Position), color: TEMP_COLOR}, {x: 10, y: 10});

//         p1.phase += p1.speed;
//         p2.phase += p2.speed;

//         if(tickCount % 5 === 0){
//             drawLine(ctxPerm, {...normalisePoint(p1Position), color: "#ffffff10"}, {...normalisePoint(p2Position), color: "#ffffff00"},)
//         }

//         tickCount++;
//         requestAnimationFrame(draw)

//     }

//     draw();

// }
