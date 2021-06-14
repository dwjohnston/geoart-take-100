import { Algorithm } from './_Algorithm';

export const SimpleSineAlgorithm: Algorithm = {
    name: "Simple Sine",
    modelDefinition: [

        {
            valueType: "number",
            valueMaker: "TickingPhaseMaker",
            params: {
                initialValue: 0,
                max: 1,
                step: 0.015,
            },
            id: "phase"
        },

        {
            valueType: "number",
            valueMaker: "StaticNumberMaker",
            params: {
                value: 0.2
            },
            id: 'frequency',
        },

        {
            valueType: "number",
            valueMaker: "Normalizer",
            params: {
                offset: 0,
                numerator: {
                    type: "reference",
                    reference: "phase"
                },
                denominator: 1,
                inputValue: {
                    type: "reference",
                    reference: "frequency"
                }
            },
            id: "adjusted-phase-a"
        },

        {
            valueType: "number",
            valueMaker: "Normalizer",
            params: {
                offset: 0,
                numerator: Math.PI * 2,
                denominator: 1,
                inputValue: {
                    type: "reference",
                    reference: "adjusted-phase-a"
                }
            },
            id: "adjusted-phase-b"
        },


        {
            valueType: "number",
            valueMaker: "SineNumberMaker",
            params: {
                phase: {
                    type: "reference",
                    reference: "adjusted-phase-b"
                },
                amplitude: 0.5
            },
            id: "sine-value",
        },

        {
            valueType: "number",
            valueMaker: "Normalizer",
            params: {
                offset: 0.5,
                numerator: 1,
                denominator: 1,
                inputValue: {
                    type: "reference",
                    reference: "sine-value"
                }
            },
            id: "y"
        },

        {
            valueType: "position",
            valueMaker: "XYPositionMaker",
            params: {
                x: {
                    type: "reference",
                    reference: "phase"
                },
                y: {
                    type: "reference",
                    reference: "y"
                },
            },
            id: "position"
        }

    ],
    drawMakers: [{
        drawType: "DrawDot",
        params: {
            p1: {
                type: "reference",
                reference: "position",
            },

        }
    },],
    controlHints: [
        {
            valueMakerId: "frequency",
            controlType: "slider",
            params: {
                label: "Frequency",
                min: 0.01,
                max: 10,
                step: 0.1,
                initialValue: 1,

            },
            visible: true,

        },
    ],

}; 