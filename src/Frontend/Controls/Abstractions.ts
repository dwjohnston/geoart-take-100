export type AbstractControlId = string;
export type AbstractControlType = "slider"; //TODO probably use a typeof to find all the possible values, or similar.
export type AbstractControlInputParams = Record<string, unknown>;
export type AbstractControlOutputValue = unknown;

export type ControlTypeMap = {
  slider: {
    input: {
      label: string;
      min: number;
      max: number;
      initialValue: number;
      step: number;
    };
    output: number;
  };
};

// not currently needed.
// export type AbstractControlInput<TId extends AbstractControlId, TInputParams extends AbstractControlInputParams> = {
//     id: TId;
//     params: TInputParams;
// }

//Possibly make the Tid the last param and make it optional?
export type AbstractControlOutput<
  TId extends AbstractControlId,
  TValue extends AbstractControlOutputValue
> = {
  id: TId;
  value: TValue;
};

export type AbstractControlProps<
  TId extends AbstractControlId,
  TInputParams extends AbstractControlInputParams,
  TOutputValue extends AbstractControlOutputValue
> = {
  id: TId;
  onChange: (value: AbstractControlOutput<TId, TOutputValue>) => void;
  params: TInputParams;
};

// We possibly want to add output value to this, so we are enforcing that they are getting the right output value type
export type ControlConfig<T extends AbstractControlType> = {
  type: T;
  id: AbstractControlId;
  params: ControlTypeMap[T]["input"];
};


export type ControlHint<TId extends AbstractControlId = AbstractControlId, T extends AbstractControlType = AbstractControlType> = {
  valueMakerId: TId;
  controlType: T;  
  params: ControlTypeMap[T]['input']
  visible: boolean; 
}