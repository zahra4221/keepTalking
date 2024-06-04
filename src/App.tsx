import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './assets/pages/Homepage';
import Filpage from './assets/pages/Filpage';

const App: React.FC = () => {
  return (
    <Router>
      <div className='app'>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/filpage" element={<Filpage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
