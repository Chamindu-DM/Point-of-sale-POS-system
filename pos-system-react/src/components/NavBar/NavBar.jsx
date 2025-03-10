import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import LogoImage from '../../assets/images/Cheese Bakes logo.svg';
import { ReactComponent as BellIcon } from '../../assets/icons/BellRinging.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/MagnifyingGlass.svg';
import { ReactComponent as UserIcon } from '../../assets/icons/UserCircle.svg';

const NavBar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-brand">
          <img src={LogoImage} alt="Cheese Bakes Logo" className="nav-logo" />
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
            <SearchIcon />
          </button>
        </div>
      </div>

      <div className="nav-right">
        <div className="nav-icons">
          <button className="nav-icon">
            <BellIcon />
            <span className="notification-badge">3</span>
          </button>
          <button className="nav-icon"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <UserIcon />
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