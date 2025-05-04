import React, {useEffect, useState} from "react";
import "./home.css";
import v1 from "../../Assets/v1.mp4";
import { FaSearchLocation, FaPlane, FaHotel, FaCar, FaUmbrellaBeach, FaCamera, FaPassport, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { IoLocationSharp } from 'react-icons/io5';
import Aos from "aos";
import "aos/dist/aos.css";

const servicesData = [
  {
    id: 1,
    icon: <FaPlane className="icon" />,
    title: "Flight Booking",
    description: "Book flights to any destination with our exclusive deals and offers.",
    features: ["Best Price Guarantee", "24/7 Support", "Flexible Booking"]
  },
  {
    id: 2,
    icon: <FaHotel className="icon" />,
    title: "Hotel Booking",
    description: "Find the perfect accommodation for your stay with our wide range of options.",
    features: ["Luxury Hotels", "Budget Stays", "Resort Bookings"]
  },
  {
    id: 3,
    icon: <FaCar className="icon" />,
    title: "Car Rental",
    description: "Rent a car for your travel needs with our reliable service.",
    features: ["Multiple Options", "Insurance Included", "24/7 Support"]
  },
  {
    id: 4,
    icon: <FaUmbrellaBeach className="icon" />,
    title: "Tour Packages",
    description: "Explore our curated tour packages for the best travel experience.",
    features: ["Customizable Tours", "Expert Guides", "All-Inclusive"]
  },
  {
    id: 5,
    icon: <FaCamera className="icon" />,
    title: "Travel Photography",
    description: "Capture your memories with our professional photography services.",
    features: ["Professional Photographers", "Photo Editing", "Digital Albums"]
  },
  {
    id: 6,
    icon: <FaPassport className="icon" />,
    title: "Visa Assistance",
    description: "Get help with your visa applications and documentation.",
    features: ["Documentation Help", "Fast Processing", "Expert Guidance"]
  }
];

const Home = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Aos.init({duration: 2000});
    fetchTours();
  },[]);

  const fetchTours = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tours?limit=6');
      const data = await response.json();
      setTours(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tours:', error);
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      {/* Home Section */}
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

      {/* About Section */}
      <section className="about-section container section">
        <div className="about-header">
          <span className="about-badge">About Us <span role="img" aria-label="globe">🌍</span></span>
          <div className="about-main">
            <div className="about-text">
              <h2>Traveling Opens The Door To Creating <span className="about-highlight">Memories</span></h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempus massa vitae elit consectetur, ut convallis massa ultricies. Duis hendrerit turpis quis tincidunt lobortis. Nullam vel faucibus mauris.</p>
            </div>
            <div className="about-illustration">
              <img src="https://cdn.pixabay.com/photo/2017/01/31/13/14/earth-2025489_1280.png" alt="Travel Illustration" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section container section">
        <div className="services-header">
          <span className="services-badge">Our Services</span>
          <h2>What We Offer</h2>
          <p>Explore our comprehensive range of travel services designed to make your journey unforgettable</p>
        </div>

        <div className="services-grid">
          {servicesData.map((service, index) => (
            <div 
              key={service.id} 
              className="service-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="service-icon">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <button className="btn">Learn More</button>
            </div>
          ))}
        </div>
      </section>

      {/* Tour Section */}
      <section className="tour-section container section">
        <div className="tour-header">
          <span className="services-badge">Featured Tours</span>
          <h2 className="sub-heading">Popular Destinations</h2>
          <p className="sub-para">Explore our most popular tour packages and start your next adventure</p>
        </div>
        <div className="tour-grid">
          {loading ? (
            <div className="loading">Loading tours...</div>
          ) : tours.length > 0 ? (
            tours.map((tour, index) => (
              <div 
                key={tour._id} 
                className="tour-card-modern"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="tour-image-container">
                  <img 
                    src={tour.image || 'default-tour.jpg'} 
                    alt={tour.destination} 
                    className="tour-image" 
                  />
                </div>
                <div className="tour-content">
                  <h3 className="tour-title">{tour.destination}</h3>
                  <div className="tour-info-row">
                    <span className="tour-info-item">
                      <IoLocationSharp className="icon" /> {tour.location}
                    </span>
                    <span className="tour-info-item">
                      <b>Duration:</b> {tour.duration}
                    </span>
                  </div>
                  <div className="tour-info-row">
                    <span className="tour-info-item">
                      <b>Date:</b> {new Date(tour.date).toLocaleDateString()}
                    </span>
                    <span className="tour-info-item">
                      <b>Fees:</b> ${tour.fees}
                    </span>
                  </div>
                  <div className="tour-description">
                    <p>{tour.description?.substring(0, 100)}...</p>
                  </div>
                  <button className="btn">View Details</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-tours">No tours available at the moment.</div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section container section">
        <div className="contact-header">
          <span className="contact-badge">Contact Us</span>
          <h2>Get In Touch</h2>
          <p>Have questions or need assistance? We're here to help!</p>
        </div>

        <div className="contact-content">
          <div className="contact-info" data-aos="fade-right">
            <div className="info-item">
              <FaMapMarkerAlt className="icon" />
              <div>
                <h3>Our Location</h3>
                <p>123 Travel Street, Adventure City, AC 12345</p>
              </div>
            </div>

            <div className="info-item">
              <FaPhone className="icon" />
              <div>
                <h3>Phone Number</h3>
                <p>+1 (123) 456-7890</p>
              </div>
            </div>

            <div className="info-item">
              <FaEnvelope className="icon" />
              <div>
                <h3>Email Address</h3>
                <p>info@travelhub.com</p>
              </div>
            </div>

            <div className="info-item">
              <FaClock className="icon" />
              <div>
                <h3>Working Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>

          <div className="contact-form-container" data-aos="fade-left">
            <form className="contact-form">
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Subject" required />
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message" required rows="5"></textarea>
              </div>
              <button type="submit" className="btn">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;