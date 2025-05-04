import React, {useEffect} from "react";
import "./home.css";
import v1 from "../../Assets/v1.mp4";
import { FaSearchLocation } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

import Aos from "aos";
import "aos/dist/aos.css";

const Home = () => {

  useEffect(() => {
    Aos.init({duration: 2000});
  },[]);

  return (
    <section className="home">
      <div className="overlay"></div>
      <video src={v1} muted autoPlay loop type="video/mp4"></video>
    
      <div className="homeContent container">
        <div className="textDiv">

          <span data-aos="fade-up" className="smallText">
            Our Packages
          </span>

          <h1 data-aos="fade-up" className="homeTitle">
            Search Your Destination
          </h1>

        </div>

        <div data-aos="fade-up" className="cardDiv grid">
          <div className="destinationInput">
            <label htmlFor="city">Search Your Destination</label>
            <div className="input flex">
              <input type="text" placeholder="Enter Name..."/>
              <FaSearchLocation className="icon"/>
            </div>
          </div>

          <div className="dateInput">
            <label htmlFor="date">Select Date</label>
            <div className="input flex">
              <input type="date" placeholder="Select Date"/>
            </div>
          </div>

          <div className="priceInput">
            <div className="label_total flex">
              <label htmlFor="price">Max Price:</label>
              <h3 className="total">$5000</h3>
            </div>
            <div className="input flex">
              <input type="range" max="5000" min="1000"/>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

export default Home;