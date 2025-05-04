import React, { useEffect, useState } from "react";
import "./main.css";
import { IoLocationSharp } from "react-icons/io5";
import { FaClipboard } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const API_URL = 'http://localhost:5000';

// Helper to truncate description to 40 words
function truncateDescription(text, wordLimit = 40) {
  if (!text) return '';
  const words = text.split(' ');
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(' ') + '...';
}

const Main = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 2000 });
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/tours`);
      setTours(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleTourClick = (tourId) => {
    navigate(`/tour/${tourId}`);
  };

  if (loading) {
    return <div className="loading">Loading tours...</div>;
  }

  return (
    <section className="main container section">
      <div className="secTitle">
        <h3 data-aos="fade-right" className="title">
          Available Tours
        </h3>
      </div>

      <div className="secContent grid">
        {tours.map((tour) => (
          <div data-aos="fade-up" key={tour._id} className="singleDestination">
            <div className="imgDiv">
              <img src={tour.image || 'default-tour.jpg'} alt={tour.destination} />
            </div>

            <div className="cardInfo">
              <h4 className="destTitle">{tour.destination}</h4>
              <span className="continent flex">
                <IoLocationSharp className="icon" />
                <span className="name">{tour.location}</span>
              </span>

              <div className="fees flex">
                <div className="grade">
                  <span>{tour.duration}</span>
                </div>
                <div className="price">
                  <h5>${tour.fees}</h5>
                </div>
              </div>

              <div className="desc">
                <p>{truncateDescription(tour.description, 40)}</p>
              </div>

              <button 
                className="btn flex"
                onClick={() => handleTourClick(tour._id)}
              >
                DETAILS <FaClipboard className="icon" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Main;