import { useState } from 'react';
import './App.css';
import { Canvas } from './Frontend/Canvas/Canvas';
import { ControlContainer } from './Frontend/Controls/ControlContainer/ControlContainer';
import { GeoSlider } from './Frontend/Controls/GeoSlider/GeoSlider';
import { Debug } from './Frontend/DebugTools/Debug';
import { ControlContainer as ControlContainerLayout } from './Frontend/Layout/ControlContainer';
import { getRandomModel } from './ModelMapper';

function App() {


  const model = getRandomModel();

  console.log(model.getControllers());

  const handleChange= (idList: string[],value: unknown) => {
    console.log(idList,value);

    model.updateProperty(idList, value);
    setOnChangeDebug({
      idList, value
    }); 
  }


  const [onChangeDebug, setOnChangeDebug] = useState<any>(null);

  return (
    <div className="App">


      <Debug label = "onChange" item = {onChangeDebug}/> 


      <Canvas model = {model}/>
      <ControlContainerLayout>
      </ControlContainerLayout>

      <ControlContainer idList = {[]} onChange= {handleChange} label = "main" depth = {0} controlConfig = {model.getControllers()}/>
    </div>
  );
}

export default App;
