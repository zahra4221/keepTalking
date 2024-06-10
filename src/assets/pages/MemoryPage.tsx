import React, { useState } from 'react';
import '../../App.css';

interface Result {
  position: number;
  value: number;
}

const MemoryPage: React.FC = () => {
  const [screenNumber, setScreenNumber] = useState<string>('');
  const [buttons, setButtons] = useState<string[]>(['1', '1', '1', '1']);
  const [results, setResults] = useState<Result[]>([]);
  const [step, setStep] = useState<number>(1);
  const [goPressed, setGoPressed] = useState<boolean>(false);

  const handleGo = () => {
    let result = { position: 0, value: 0 };
    const screen = parseInt(screenNumber);
    const btns = buttons.map(b => parseInt(b));

    switch (step) {
      case 1:
        if (screen === 1 || screen === 2) result = { position: 2, value: btns[1] };
        else if (screen === 3) result = { position: 3, value: btns[2] };
        else if (screen === 4) result = { position: 4, value: btns[3] };
        break;
      case 2:
        if (screen === 1) result = { position: btns.indexOf(4) + 1, value: 4 };
        else if (screen === 2 || screen === 4) {
          const firstStepPosition = results[0].position;
          result = { position: firstStepPosition, value: btns[firstStepPosition - 1] };
        } else if (screen === 3) result = { position: 1, value: btns[0] };
        break;
      case 3:
        if (screen === 1) {
          const secondStepValue = results[1].value;
          result = { position: btns.indexOf(secondStepValue) + 1, value: secondStepValue };
        } else if (screen === 2) {
          const firstStepValue = results[0].value;
          result = { position: btns.indexOf(firstStepValue) + 1, value: firstStepValue };
        } else if (screen === 3) {
          result = { position: 3, value: btns[2] };
        } else if (screen === 4) {
          result = { position: btns.indexOf(4) + 1, value: 4 };
        }
        break;
      case 4:
        if (screen === 1) {
          const firstStepPosition = results[0].position;
          result = { position: firstStepPosition, value: btns[firstStepPosition - 1] };
        } else if (screen === 2) {
          result = { position: 1, value: btns[0] };
        } else if (screen === 3 || screen === 4) {
          const secondStepPosition = results[1].position;
          result = { position: secondStepPosition, value: btns[secondStepPosition - 1] };
        }
        break;
      case 5:
        if (screen === 1) {
          const firstStepValue = results[0].value;
          result = { position: btns.indexOf(firstStepValue) + 1, value: firstStepValue };
        } else if (screen === 2) {
          const secondStepValue = results[1].value;
          result = { position: btns.indexOf(secondStepValue) + 1, value: secondStepValue };
        } else if (screen === 3) {
          const fourthStepValue = results[3].value;
          result = { position: btns.indexOf(fourthStepValue) + 1, value: fourthStepValue };
        } else if (screen === 4) {
          const thirdStepValue = results[2].value;
          result = { position: btns.indexOf(thirdStepValue) + 1, value: thirdStepValue };
        }
        break;
    }

    const newResults = [...results];
    newResults[step - 1] = result;
    setResults(newResults);
    setGoPressed(true);
  };

  const handleNextStep = () => {
    if (step < 5) {
      setStep(step + 1);
      setScreenNumber('');
      setButtons(['1', '1', '1', '1']);
      setGoPressed(false);
    }
  };

  const handleRestart = () => {
    setScreenNumber('');
    setButtons(['1', '1', '1', '1']);
    setResults([]);
    setStep(1);
    setGoPressed(false);
  };

  const isGoDisabled = !screenNumber || buttons.some(button => button === '');

  return (
    <div className="memory-game">
      <h1>Memory Game - Étape {step}</h1>
      <div>
        <label>Numéro de l'écran :</label>
        <div className="button-container">
          {[1, 2, 3, 4].map(num => (
            <button
              key={num}
              className={`number-button ${screenNumber === num.toString() ? 'selected' : ''}`}
              onClick={() => setScreenNumber(num.toString())}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label>Numéros des boutons :</label>
        <div className="picker-container">
          {buttons.map((btn, index) => (
            <div key={index} className="picker-wrapper">
              <select
                value={btn}
                onChange={(e) => {
                  const newButtons = [...buttons];
                  newButtons[index] = e.target.value;
                  setButtons(newButtons);
                }}
              >
                {[1, 2, 3, 4].map(num => (
                  <option key={num} value={num.toString()}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
      <button className={`go-button ${isGoDisabled ? 'disabled' : ''}`} onClick={handleGo} disabled={isGoDisabled}>
        Go
      </button>
      <button className={`next-button ${!goPressed ? 'disabled' : ''}`} onClick={handleNextStep} disabled={!goPressed}>
        Étape suivante
      </button>
      {results.map((result, index) => (
        <p key={index}>
          Étape {index + 1} : Appuyez sur le chiffre {result?.value} (position {result?.position})
        </p>
      ))}
      {step > 4 && (
        <button className="restart-button" onClick={handleRestart}>
          Recommencer
        </button>
      )}
    </div>
  );
};

export default MemoryPage;
