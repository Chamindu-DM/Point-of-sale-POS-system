import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">POS System</div>
      <ul className="nav-links">
        <li><Link to="/">POS</Link></li>
        <li><Link to="/sales">Sales History</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;