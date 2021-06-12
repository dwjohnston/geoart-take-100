import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Canvas } from "./Frontend/Canvas/Canvas";
import {
  AbstractControlId,
  AbstractControlOutput,
  AbstractControlOutputValue,
} from "./Frontend/Controls/Abstractions";
import { ControlPanel } from "./Frontend/Controls/ControlPanel/ControlPanel";
import { Debug } from "./Frontend/DebugTools/Debug";
import { preBuiltModels, getModel, TheWholeModel } from "./ModelMapper";
import { MenuItem, Select } from "@material-ui/core";


function App() {

  const [selectedModelName, setSelectedModelName] = useState<keyof typeof preBuiltModels>("earth-venus");


  const [model, setModel] = useState<TheWholeModel>(getModel(selectedModelName));

  useEffect(() => {
    resetRef.current();
    setModel(getModel(selectedModelName));
  }, [selectedModelName]);

  const handleChange = (idList: string[], value: unknown) => {

    // model.updateProperty(idList, value);
    setOnChangeDebug({
      idList,
      value,
    });
  };

  const handleChange2 = (
    value: AbstractControlOutput<AbstractControlId, AbstractControlOutputValue>
  ) => {

    model.updateProperty(value);

    resetRef.current();
  };

  const [onChangeDebug, setOnChangeDebug] = useState<any>(null);


  const resetRef = useRef(() => { });

  const handleCanvasMount = (payload: {
    resetCallback: () => void;
  }) => {
    resetRef.current = payload.resetCallback;
  };

  return (
    <div className="App">
      <h1>GeoPlanets - interactive geometric art</h1>
      <strong> I'm rebuilding this!</strong>
      <p>
        The{" "}
        <a
          href="https://github.com/dwjohnston/geoart-v4"
          target="_blank"
          rel="noreferrer"
        >
          original
        </a>{" "}
        project died as it was running on an old version of node (6) using GCP
        Firebase, which they discontinued support on.{" "}
      </p>
      <p>
        THat project was my first real foray in to React development, and I'm
        since a lot better developer
      </p>
      <p>
        The focus this time around is to allow more declarative creation of
        models, and that will enable users to create their own models
      </p>

      <p>
        Follow along with the{" "}
        <a
          href="https://github.com/dwjohnston/geoart-take-100/tree/master/blog"
          target="_blank"
          rel="noreferrer"
        >
          blog
        </a>{" "}
        if you're interested
      </p>

      <hr />
      <Debug label="onChange" item={onChangeDebug} />
      <Canvas model={model} onMount={handleCanvasMount} />
      <div>
        <label> Select Algorithm:
          <Select value={selectedModelName} variant="outlined" onChange={(e) => {
            setSelectedModelName(e.target.value as keyof typeof preBuiltModels);
          }}>
            {Object.keys(preBuiltModels).map(v => <MenuItem value={v} key={v}>{v}</MenuItem>)}
          </Select>
        </label>

      </div>
      <ControlPanel
        onChange={handleChange2}
        controls={model.getControlConfigs().map((v) => v.config)}
      />
    </div>
  );
}

export default App;
