import React, {useEffect} from "react";
import "./footer.css";
import video2 from "../../Assets/v2.mp4";
import { IoIosSend } from "react-icons/io";
import { MdTravelExplore } from "react-icons/md";
import { FaTripadvisor, FaTwitter, FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi";

import Aos from "aos";
import "aos/dist/aos.css";

const Footer = () => {

  useEffect(() => {
    Aos.init({duration: 2000});
  },[]);

  return (
    <section className="footer">
      <div className="videoDiv">
        <video src={video2} loop autoPlay muted type="video/mp4"></video>
      </div>

      <div className="secContent container">
        <div className="contactDiv flex">
          <div data-aos="fade-up" className="text">
            <small>KEEP IN TOUCH</small>
            <h2>Travel with us</h2>
          </div>

          <div className="inputDiv flex">
            <input data-aos="fade-up" type="text" placeholder="Enter Email Address" />
            <button data-aos="fade-up" className="btn flex" type="submit">
                SEND <IoIosSend className="icon"/>
            </button>
          </div>
        </div>

        <div className="footerCard flex">
          <div className="footerIntro flex">
            <div className="logoDiv">
              <a href="" className="logo flex">
                TravelHub <MdTravelExplore className="icon"/>
              </a>
            </div>

            <div data-aos="fade-up" className="footerParagraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </div>

            <div data-aos="fade-up" className="footerSocials flex">
              <FaTwitter className="icon"/>
              <FaYoutube className="icon"/>
              <AiFillInstagram className="icon"/>
              <FaTripadvisor className="icon"/>
             </div>
          </div>
          <div className="footerLinks grid">
            {/* Group One */}
            <div data-aos="fade-up" className="linkGroup">
              <span className="groupTitle">
                OUR AGENCY
              </span>

              <li className="footerList flex">
                <FiChevronRight className="icon"/>
                Servces
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon"/>
                Insurance
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon"/>
                Agency
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon"/>
                Tourism
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon"/>
                Payment
              </li>
            </div>

          </div>

          <div className="footerDiv flex">
            <small>BEST TRAVEL AGENCY</small>
            <small>COPYRIGHTS RESERVED - 2025</small>
          </div>
        </div>
      </div>

    </section>
  );
}

export default Footer;