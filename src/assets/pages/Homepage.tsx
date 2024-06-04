import React from 'react';
import '../../App.css';

const Homepage: React.FC = () => {
  return (
    <div className='app'>
        <div className="first-step-zone">
          <h2>Cliquer sur le bouton et relacher immédatement</h2>
          <div className="first-case">
            <div className="easy-case">
              <div className="condition">
                Si
              </div>
              <div className="button red">
                Maintenir
              </div>
            </div>
            <div className="piles-case">
              <div className="else">Ou</div>
              <ul>
                <li className="explose">"Exploser" et 3 Piles ou +</li>
                <li className="frk">FRK et 2 Piles ou +</li>
              </ul> 
            </div>
          </div>
        </div>
        <div className="second-step-zone">
          <h2>Restez appuyé sur le bouton et relacher quand le numéro correspondant est affiché dans le chrono</h2>
          <div className="cases">
            <div className="blue-case case">
              <div className="color-tag color-tag-blue">bleu</div>
              <div className="value">4</div>
            </div>
            <div className="yellow-case case">
              <div className="color-tag color-tag-yellow">jaune</div>
              <div className="value">5</div>
            </div>
            <div className="else-case case">
              <div className="color-tag color-tag-other">autre</div>
              <div className="value">1</div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Homepage;
