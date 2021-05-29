import { NotImplementedError } from '../../Errors/errors';
import { AbstractControlType, ControlConfig } from '../../Frontend/Controls/Abstractions';

export type ControlConfigAndUpdateFunction<T> = {
    config: ControlConfig<AbstractControlType>; 
    updateFn: (value: T) => void; 
}


export class AbstractValueMaker<T> {
    getValue(): T {
        throw new NotImplementedError();
    }

    updateValue(v: T) {
        throw new NotImplementedError();
    }

    getControlConfig(): ControlConfigAndUpdateFunction<T>[] {
        throw new NotImplementedError();
    }
}