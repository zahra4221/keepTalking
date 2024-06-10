import React, { useState, useEffect } from 'react';
import '../../App.css';
import symbol1 from '../symbols/symbol1.jpeg';
import symbol2 from '../symbols/symbol2.jpeg';
import symbol3 from '../symbols/symbol3.jpeg';
import symbol4 from '../symbols/symbol4.jpeg';
import symbol5 from '../symbols/symbol5.jpeg';
import symbol6 from '../symbols/symbol6.jpeg';
import symbol7 from '../symbols/symbol7.jpeg';
import symbol8 from '../symbols/symbol8.jpeg';
import symbol9 from '../symbols/symbol9.jpeg';
import symbol10 from '../symbols/symbol10.jpeg';
import symbol11 from '../symbols/symbol11.jpeg';

const symbolColumns = [
  ['symbol1', 'symbol2', 'symbol3', 'symbol4', 'symbol5', 'symbol6', 'symbol7'],
  ['symbol8', 'symbol1', 'symbol7', 'symbol9', 'symbol10', 'symbol6', 'symbol11']
];

const symbolImages: { [key: string]: string } = {
  'symbol1': symbol1,
  'symbol2': symbol2,
  'symbol3': symbol3,
  'symbol4': symbol4,
  'symbol5': symbol5,
  'symbol6': symbol6,
  'symbol7': symbol7,
  'symbol8': symbol8,
  'symbol9': symbol9,
  'symbol10': symbol10,
  'symbol11': symbol11,
};
const symbolKeys = Object.keys(symbolImages);

const SymbolPage: React.FC = () => {
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);
  const [orderedSymbols, setOrderedSymbols] = useState<string[]>([]);

  const handleSymbolSelect = (symbol: string) => {
    if (selectedSymbols.includes(symbol)) {
      const newSelectedSymbols = selectedSymbols.filter(item => item !== symbol);
      setSelectedSymbols(newSelectedSymbols);
    } else if (selectedSymbols.length < 4) {
      const newSelectedSymbols = selectedSymbols.concat(symbol);
      setSelectedSymbols(newSelectedSymbols);
    }
  };

  const handleGoButtonClick = () => {
    const orderedSymbolsList: string[] = [];
    const uniqueSelectedSymbols = Array.from(new Set(selectedSymbols));
    for (let col of symbolColumns) {
      for (let symbol of col) {
        if (uniqueSelectedSymbols.includes(symbol) && !orderedSymbolsList.includes(symbol)) {
          orderedSymbolsList.push(symbol);
        }
      }
    }
    setOrderedSymbols(orderedSymbolsList);
  };

  useEffect(() => {
    if (selectedSymbols.length !== 4) {
      setOrderedSymbols([]);
    }
  }, [selectedSymbols]);

  return (
    <div className="safe-view">
      <div className="container">
        <h1 className="title">Symboles</h1>
        <div className="grid">
          {symbolKeys.map((symbol, index) => (
            <div
              key={index}
              className={`image-container ${selectedSymbols.includes(symbol) ? 'selected-image-container' : ''}`}
              onClick={() => handleSymbolSelect(symbol)}
            >
              <img src={symbolImages[symbol]} alt={symbol} className="image" />
            </div>
          ))}
        </div>
        {selectedSymbols.length === 4 && (
          <button className="go-button" onClick={handleGoButtonClick}>Go</button>
        )}
        {orderedSymbols.length > 0 && (
          <div className="ordered-container">
            <h2 className="ordered-title">Ordre</h2>
            <div className="ordered-grid">
              {orderedSymbols.map((symbol, index) => (
                <div key={index} className="image-container">
                  <img src={symbolImages[symbol]} alt={symbol} className="image" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymbolPage;
