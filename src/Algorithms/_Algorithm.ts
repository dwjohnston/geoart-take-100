import { ControlHint } from '../Frontend/Controls/Abstractions';

export type Algorithm = {
    name: string; 
        //TODO tighten these

    modelDefinition: Array<any>;
    drawMakers: Array<any>;
    controlHints: Array<ControlHint>;
}