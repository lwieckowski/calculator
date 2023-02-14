import './App.css';

function App() {
  return (
    <div id="app-container">
      <div>
        <div id="display">00000000</div>
        <div id="key-container">
          <div className="key dark-grey">C</div>
          <div className="key dark-grey">&plusmn;</div>
          <div className="key dark-grey">%</div>
          <div className="key orange">&divide;</div>
          <div className="key light-grey">7</div>
          <div className="key light-grey">8</div>
          <div className="key light-grey">9</div>
          <div className="key orange">&times;</div>
          <div className="key light-grey">4</div>
          <div className="key light-grey">5</div>
          <div className="key light-grey">6</div>
          <div className="key orange">-</div>
          <div className="key light-grey">1</div>
          <div className="key light-grey">2</div>
          <div className="key light-grey">3</div>
          <div className="key orange">+</div>
          <div className="key light-grey" id="key-0">0</div>
          <div className="key light-grey">.</div>
          <div className="key orange">=</div>
        </div>
      </div>
    </div>
  );
}

export default App;
