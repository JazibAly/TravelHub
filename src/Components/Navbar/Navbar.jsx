import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const name = localStorage.getItem('name');
    setUserName(name);
  }, [location]); // update on route change

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    setUserName(null);
    navigate('/home');
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
          {userName ? (
            <>
              <span className="nav-item">Welcome, {userName}</span>
              <button className="nav-item" onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-item" onClick={() => setIsOpen(false)}>
              Login
            </Link>
          )}
        </div>

        <div className="mobile-menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;