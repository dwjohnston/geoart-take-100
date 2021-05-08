


export type AbstractControlId = string;
export type AbstracControlType = string; //TODO probably use a typeof to find all the possible values, or similar. 
export type AbstractControlInputParams = Record<string, unknown> ; 
export type AbstractControlOutputValue = unknown; 


// not currently needed.
// export type AbstractControlInput<TId extends AbstractControlId, TInputParams extends AbstractControlInputParams> = {
//     id: TId; 
//     params: TInputParams; 
// }


//Possibly make the Tid the last param and make it optional? 
export type AbstractControlOutput<TId extends AbstractControlId, TValue extends AbstractControlOutputValue>  ={
    id: TId; 
    value: TValue; 
}

export type AbstractControlProps<TId extends AbstractControlId, TInputParams extends AbstractControlInputParams, TOutputValue extends AbstractControlOutputValue> = {
    id: TId; 
    onChange: (value: AbstractControlOutput<TId, TOutputValue>) => void; 
    params: TInputParams; 
} 

