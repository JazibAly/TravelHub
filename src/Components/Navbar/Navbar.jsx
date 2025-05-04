import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          TravelHub
        </Link>

        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-item" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/about" className="nav-item" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link to="/services" className="nav-item" onClick={() => setIsOpen(false)}>
            Services
          </Link>
          <Link to="/gallery" className="nav-item" onClick={() => setIsOpen(false)}>
            Gallery
          </Link>
          <Link to="/contact" className="nav-item" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
        </div>

        <div className="mobile-menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;