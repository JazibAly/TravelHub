import React, { useEffect } from 'react';
import './Services.css';
import { FaPlane, FaHotel, FaCar, FaUmbrellaBeach, FaCamera, FaPassport } from 'react-icons/fa';
import Aos from 'aos';
import 'aos/dist/aos.css';

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

const Services = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
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
  );
};

export default Services; 