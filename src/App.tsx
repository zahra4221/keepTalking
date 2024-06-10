import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './assets/pages/Homepage';
import Filpage from './assets/pages/Filpage';
import MemoryPage from './assets/pages/MemoryPage';
import SymbolPage from './assets/pages/SymbolPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className='app'>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/filpage" element={<Filpage />} />
          <Route path="/MemoryPage" element={<MemoryPage />} />
          <Route path="/SymbolPage" element={<SymbolPage />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
