import React, { useState } from 'react';
import '../../App.css'; 

const colors = ['red', 'white', 'blue', 'yellow', 'black'];

const Filpage: React.FC = () => {
  const [numFils, setNumFils] = useState<number>(3);
  const [filsColors, setFilsColors] = useState<string[]>(Array(3).fill(''));
  const [result, setResult] = useState<string | null>(null);

  const handleNumFilsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const num = parseInt(event.target.value, 10);
    setNumFils(num);
    setFilsColors(Array(num).fill(''));
    setResult(null); 
  };

  const handleColorChange = (index: number, color: string) => {
    const newColors = [...filsColors];
    newColors[index] = color;
    setFilsColors(newColors);
  };

  const handleGoClick = () => {
    if (numFils === 3) {
      handleThreeFils();
    } else if (numFils === 4) {
      handleFourFils();
    }
  
  };

  const handleThreeFils = () => {
    let redCount = filsColors.filter(color => color === 'red').length;
    let blueCount = filsColors.filter(color => color === 'blue').length;
    let lastColor = filsColors[filsColors.length - 1];

    if (redCount === 0) {
      setResult('Coupez le deuxième fil');
    } else if (lastColor === 'white') {
      setResult('Coupez le dernier fil');
    } else if (blueCount > 1) {
      setResult('Coupez le dernier fil bleu');
    } else {
      setResult('Coupez le dernier fil');
    }
  };

  const handleFourFils = () => {
    let redCount = filsColors.filter(color => color === 'red').length;
    let blueCount = filsColors.filter(color => color === 'blue').length;
    let yellowCount = filsColors.filter(color => color === 'yellow').length;
    let lastColor = filsColors[filsColors.length - 1];

    const lastDigitOdd = true; 

    if (redCount > 1 && lastDigitOdd) {
      setResult('Coupez le dernier fil rouge');
    } else if (lastColor === 'yellow' && redCount === 0) {
      setResult('Coupez le premier fil');
    } else if (blueCount === 1) {
      setResult('Coupez le premier fil');
    } else if (yellowCount > 1) {
      setResult('Coupez le dernier fil');
    } else {
      setResult('Coupez le deuxième fil');
    }
  };


  return (
    <div className='filpage'>
      <h1>Règle sur les fils</h1>
      <p>Un seul fil a besoin d'être coupé pour désarmer le module et les fils sont ordonnés de haut en bas.</p>
      <label htmlFor="numFils">Choisissez le nombre de fils:</label>
      <select id="numFils" value={numFils} onChange={handleNumFilsChange}>
        {[3, 4, 5, 6].map(num => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>
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
      {result && <p>Résultat: {result}</p>}
    </div>
  );
};

export default Filpage;
