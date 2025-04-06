import React, {useState} from "react";
import "./navbar.css";
import { MdTravelExplore } from "react-icons/md";
import { FaWindowClose } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";


const Navbar = () => {
  const [Active, setActive] = useState('navBar');
// Toggle navbar
  const showNavbar = () => {
    setActive('navBar activeNavbar');
  }
  // Close navbar
  const removeNavbar = () => {
    setActive('navBar');
  }

  return (
    <section className="navBarSection">
      <header className="header flex">
        
        <div className="logoDiv">
          <a href="#" className="logo flex">
            <h1><MdTravelExplore className="icon"/> TravelHub</h1>
          </a>
        </div>

        <div className={Active}>
          <ul className="navLists flex">
            <li className="navItem">
              <a href="#" className="navLink">Home</a>
            </li>
            <li className="navItem">
              <a href="#about" className="navLink">About</a>
            </li>
            <li className="navItem">
              <a href="#services" className="navLink">Services</a>
            </li>
            <li className="navItem">
              <a href="#gallery" className="navLink">Gallery</a>
            </li>
            <li className="navItem">
              <a href="#contact" className="navLink">Contact</a>
            </li>

            <button className="btn">
              <a href="#">Book Now</a>
            </button>
          </ul>

          <div onClick={removeNavbar} className="closeNavbar">
          <FaWindowClose className="icon"/>
          </div>
        </div>

        <div onClick={showNavbar} className="toggleNavbar">
          <RxHamburgerMenu className="icon"/>
        </div>
      </header>
    </section>
  );
}

export default Navbar;