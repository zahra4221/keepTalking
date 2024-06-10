import React, { useState, useMemo } from 'react';
import '../../App.css';

const colors = ['red', 'white', 'blue', 'yellow', 'black'];

const Filpage: React.FC = () => {
  const [numFils, setNumFils] = useState<number>(3);
  const [filsColors, setFilsColors] = useState<string[]>(Array(3).fill(''));
  const [lastDigitPair] = useState<boolean>(true);
  const [showResult, setShowResult] = useState<boolean>(false);

  const result = useMemo(() => {
    let redCount = filsColors.filter(color => color === 'red').length;
    let blueCount = filsColors.filter(color => color === 'blue').length;
    let yellowCount = filsColors.filter(color => color === 'yellow').length;
    let lastColor = filsColors[filsColors.length - 1];

    if (numFils === 3) {
      if (redCount === 0) {
        return 'Coupez le deuxième fil';
      } else if (lastColor === 'white') {
        return 'Coupez le dernier fil';
      } else if (blueCount > 1) {
        return 'Coupez le dernier fil bleu';
      } else {
        return 'Coupez le dernier fil';
      }
    } else if (numFils === 4) {
      if (redCount > 1 && lastDigitPair) {
        return 'Coupez le dernier fil rouge';
      } else if (lastColor === 'yellow' && redCount === 0) {
        return 'Coupez le premier fil';
      } else if (blueCount === 1) {
        return 'Coupez le premier fil';
      } else if (yellowCount > 1) {
        return 'Coupez le dernier fil';
      } else {
        return 'Coupez le deuxième fil';
      }
    }

    return null;
  }, [filsColors, numFils, lastDigitPair]);

  const handleNumFilsChange = (num: number) => {
    setNumFils(num);
    setFilsColors(Array(num).fill(''));
    setShowResult(false);
  };

  const handleColorChange = (index: number, color: string) => {
    const newColors = filsColors.slice();
    newColors[index] = color;
    setFilsColors(newColors);
    setShowResult(false);
  };

  const handleGoClick = () => {
    setShowResult(true);
  };

  return (
    <div className='filpage'>
      <h1>Règle sur les fils</h1>
      <p>Un seul fil a besoin d'être coupé pour désarmer le module et les fils sont ordonnés de haut en bas.</p>
      <div>
        <button onClick={() => handleNumFilsChange(3)} className={numFils === 3 ? 'selected' : ''}>3 Fils</button>
        <button onClick={() => handleNumFilsChange(4)} className={numFils === 4 ? 'selected' : ''}>4 Fils</button>
      </div>
      <div className='fils-container'>
        {filsColors.map((color, index) => (
          <div key={index} className='fil'>
            <div className='fil-box' style={{ backgroundColor: color }}>
              Fil {index + 1}
            </div>
            <div className='color-buttons'>
              {colors.map((colorOption) => (
                <button
                  key={colorOption}
                  className='color-button'
                  style={{ backgroundColor: colorOption }}
                  onClick={() => handleColorChange(index, colorOption)}
                >
                  {colorOption}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleGoClick}>Go</button>
      {showResult && <p>Résultat: {result}</p>}
    </div>
  );
};

export default Filpage;
