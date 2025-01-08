import React from 'react';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">POS System</div>
      <ul className="nav-links">
        <li><a href="#dashboard">Dashboard</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#sales">Sales History</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;