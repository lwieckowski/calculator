import './App.css';

function App() {
  return (
    <div>
      <div id="display">00000000</div>
      <div id="button-container">
        <div className="button dark-grey">C</div>
        <div className="button dark-grey">&plusmn;</div>
        <div className="button dark-grey">%</div>
        <div className="button orange">&divide;</div>
        <div className="button light-grey">7</div>
        <div className="button light-grey">8</div>
        <div className="button light-grey">9</div>
        <div className="button orange">&times;</div>
        <div className="button light-grey">4</div>
        <div className="button light-grey">5</div>
        <div className="button light-grey">6</div>
        <div className="button orange">-</div>
        <div className="button light-grey">1</div>
        <div className="button light-grey">2</div>
        <div className="button light-grey">3</div>
        <div className="button orange">+</div>
        <div className="button light-grey" id="button-0">0</div>
        <div className="button light-grey">.</div>
        <div className="button orange">=</div>
      </div>
    </div>
  );
}

export default App;
