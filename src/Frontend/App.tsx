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
import {
  getModel,
  TheWholeModel,
  getNonBrokenAlgorithms,
} from "../PureModel/ModelEntryPoint";
import { MenuItem, Select } from "@material-ui/core";
import { InfoPanel } from "./Panels/InfoPanel/InfoPanel";
import { Header } from "./Panels/Header/Header";
import { DebugPanel } from "./Panels/DebugPanel/DebugPanel";
import { StyledApp } from "./App.styles";
import { useTracking } from "./Providers/TrackingProvider";
import { useUserPreferences } from "./Providers/UserPreferencesProvider";
import { useVideoSaving } from "./Providers/VideoSavingProvider";
import { GifSaver } from "./Saving/GifSaver";

const preBuiltModels = getNonBrokenAlgorithms();

function App() {
  const [controlHints, setControlHints] = useState<Array<ControlHint>>([]);
  const { trackAlgorithmSelected, trackControlChanged, trackFeatureToggled } =
    useTracking();

  const [model, setModel] = useState<TheWholeModel | null>(null);
  const [superSpeed, setSuperSpeed] = useState(1); // Careful here - I've been a bit lazy and these can get out of sync.

  const { setPreference, getPreference } = useUserPreferences();

  const { random } = useVideoSaving();

  const [selectedModelName, setSelectedModelName] =
    useState<keyof typeof preBuiltModels | null>(null);

  useEffect(() => {
    setSelectedModelName(getPreference("selectedAlgorithm"));
  }, [getPreference, selectedModelName]);

  useEffect(() => {
    if (selectedModelName) {
      resetRef.current();

      const { model, controlHints } = getModel(selectedModelName);

      setModel(model);
      setControlHints(controlHints);

      trackAlgorithmSelected(selectedModelName);
    }
  }, [selectedModelName, trackAlgorithmSelected]);

  const handleModelChange = (
    selectedModelName: keyof typeof preBuiltModels
  ) => {
    setPreference("selectedAlgorithm", selectedModelName);
    setSelectedModelName(selectedModelName);
  };

  useEffect(() => {
    resetRef.current();
  }, [superSpeed]);

  const handleChange = (
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
      {random}
      <GifSaver />
      <InfoPanel />
      <DebugPanel onChangeValue={onChangeDebug} />
      {selectedModelName && (
        <main>
          {model && (
            <>
              <Canvas
                model={model}
                onMount={handleCanvasMount}
                superSpeed={superSpeed}
              />
              <div>
                <label>
                  {" "}
                  Select Algorithm:
                  <Select
                    value={selectedModelName}
                    variant="outlined"
                    onChange={(e) => {
                      handleModelChange(
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
                algorithmKey={selectedModelName}
                onSuperSpeedChange={setSuperSpeed}
                onChange={handleChange}
                controls={model.getControlConfigs().map((v) => v.config)}
                controlHints={controlHints}
              />
            </>
          )}
        </main>
      )}
    </StyledApp>
  );
}

export default App;
