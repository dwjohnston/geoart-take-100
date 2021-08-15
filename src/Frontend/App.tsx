import { useEffect, useRef, useState } from "react";
import { Canvas } from "./Canvas/Canvas";
import {
  AbstractControlId,
  AbstractControlOutput,
  AbstractControlOutputValue,
  ControlHint,
} from "./Controls/Abstractions";
import { ControlPanel } from "./Controls/ControlPanel/ControlPanel";
import { Debug } from "./DebugTools/Debug";
import { preBuiltModels, getModel, TheWholeModel } from "../ModelMapper";
import { MenuItem, Select } from "@material-ui/core";
import { InfoPanel } from "./Panels/InfoPanel/InfoPanel";
import { Header } from "./Panels/Header/Header";
import { DebugPanel } from "./Panels/DebugPanel/DebugPanel";
import { StyledApp } from "./App.styles";

function App() {
  const [selectedModelName, setSelectedModelName] = useState<
    keyof typeof preBuiltModels
  >("EarthVenusAlgorithm");
  const [controlHints, setControlHints] = useState<Array<ControlHint>>([]);

  const [model, setModel] = useState<TheWholeModel | null>(null);

  useEffect(() => {
    resetRef.current();

    const { model, controlHints } = getModel(selectedModelName);

    setModel(model);
    setControlHints(controlHints);
  }, [selectedModelName]);

  // @tidy tidyup required here

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
    if (model) {
      model.updateProperty(value);
    }
    resetRef.current();
  };

  const [onChangeDebug, setOnChangeDebug] = useState<any>(null);

  const resetRef = useRef(() => {});

  const handleCanvasMount = (payload: { resetCallback: () => void }) => {
    resetRef.current = payload.resetCallback;
  };

  return (
    <StyledApp>
      <Header />
      <InfoPanel />
      <DebugPanel onChangeValue={onChangeDebug} />
      <main>
        {model && (
          <>
            <Canvas model={model} onMount={handleCanvasMount} />
            <div>
              <label>
                {" "}
                Select Algorithm:
                <Select
                  value={selectedModelName}
                  variant="outlined"
                  onChange={(e) => {
                    setSelectedModelName(
                      e.target.value as keyof typeof preBuiltModels
                    );
                  }}
                >
                  {Object.keys(preBuiltModels).map((v) => (
                    <MenuItem value={v} key={v}>
                      {v}
                    </MenuItem>
                  ))}
                </Select>
              </label>
            </div>
            <ControlPanel
              onChange={handleChange2}
              controls={model.getControlConfigs().map((v) => v.config)}
              controlHints={controlHints}
            />
          </>
        )}
      </main>
    </StyledApp>
  );
}

export default App;
