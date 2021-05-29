import { useState } from 'react';
import './App.css';
import { Canvas } from './Frontend/Canvas/Canvas';
import { AbstractControlId, AbstractControlOutput, AbstractControlOutputValue } from './Frontend/Controls/Abstractions';
import { ControlContainer } from './Frontend/Controls/ControlContainer/ControlContainer';
import { ControlPanel } from './Frontend/Controls/ControlPanel/ControlPanel';
import { GeoSlider } from './Frontend/Controls/GeoSlider/GeoSlider';
import { Debug } from './Frontend/DebugTools/Debug';
import { ControlContainer as ControlContainerLayout } from './Frontend/Layout/ControlContainer';
import { getRandomModel } from './ModelMapper';

function App() {


  const model = getRandomModel();

  console.log(model.getControlConfigs());

  const handleChange = (idList: string[], value: unknown) => {
    console.log(idList, value);

    // model.updateProperty(idList, value);
    setOnChangeDebug({
      idList, value
    });
  }

  const handleChange2 = (value: AbstractControlOutput<AbstractControlId, AbstractControlOutputValue>) => {
    console.log(value);

    model.updateProperty(value);
  }


  const [onChangeDebug, setOnChangeDebug] = useState<any>(null);

  return (
    <div className="App">
      <h1>GeoPlanets - interactive geometric art</h1>
      <strong> I'm rebuilding this!</strong>
      <p>The <a href="https://github.com/dwjohnston/geoart-v4" target="_blank" rel="noreferrer">original</a> project died as it was running on an old version of node (6) using GCP Firebase, which they discontinued support on. </p>
      <p>THat project was my first real foray in to React development, and I'm since a lot better developer</p>
      <p>The focus this time around is to allow more declarative creation of models, and that will enable users to create their own models</p>

      <p>Follow along with the <a href="">blog</a> if you're interested</p>



      <hr />
      <Debug label="onChange" item={onChangeDebug} />
      <Canvas model={model} />
      <ControlPanel onChange={handleChange2} controls={model.getControlConfigs().map(v => v.config)} />
    </div>
  );
}

export default App;
