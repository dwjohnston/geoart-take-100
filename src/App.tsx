import './App.css';
import { Canvas } from './Frontend/Canvas/Canvas';
import { GeoSlider } from './Frontend/Controls/GeoSlider';
import { ControlContainer } from './Frontend/Layout/ControlContainer';
import { getRandomModel } from './ModelMapper';

function App() {


  const model = getRandomModel();

  return (
    <div className="App">


      <Canvas model = {model}/>
      <ControlContainer>
        <GeoSlider label="aa" min={0} max={100} step={1} initialValue={50} onChange={(id, value) => console.log(id, value)} id="aaa" />
      </ControlContainer>
    </div>
  );
}

export default App;
