import React from 'react';
import { Link } from 'react-router-dom';


const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/filpage">Filpage</Link></li>
          <li><Link to="/MemoryPage">MemoryPage</Link></li>
          <li><Link to="/SymbolPage">SymbolPage</Link></li>

        </ul>
      </nav>
    </header>
  );
};

export default Header;
