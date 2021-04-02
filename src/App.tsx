import './App.css';
import { GeoSlider } from './Frontend/Controls/GeoSlider';
import { ControlContainer } from './Frontend/Layout/ControlContainer';

function App() {
  return (
    <div className="App">
      foo bar

      <ControlContainer>
        <GeoSlider label="aa" min={0} max={100} step={1} initialValue={50} onChange={(id, value) => console.log(id, value)} id="aaa" />
      </ControlContainer>
    </div>
  );
}

export default App;
