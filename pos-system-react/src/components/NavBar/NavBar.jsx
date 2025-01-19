import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-brand">
          <img src="/logo.png" alt="POS Logo" className="nav-logo" />
          <span>POS System</span>
        </Link>
      </div>

      <div className="nav-center">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>

      <div className="nav-right">
        <button className="nav-icon notification-btn">
          <i className="fas fa-bell"></i>
          <span className="notification-badge">3</span>
        </button>

        <div className="profile-container">
          <button
            className="profile-btn"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <i className="fas fa-user"></i>
          </button>
          {showProfileMenu && (
            <div className="profile-dropdown">
              <Link to="/profile">Profile</Link>
              <Link to="/settings">Settings</Link>
              <Link to="/support">Support</Link>
              <hr />
              <button className="logout-btn">Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;