import React, { useState, useEffect } from 'react';
import './Contact.css';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import Aos from 'aos';
import 'aos/dist/aos.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
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
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
              />
            </div>

            <div className="form-group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                rows="5"
              ></textarea>
            </div>

            <button type="submit" className="btn">Send Message</button>
          </form>
        </div>
      </div>

      <div className="map-container" data-aos="fade-up">
        <iframe
          title="TravelHub Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2155718125!2d-73.987844924164!3d40.757339971389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1681234567890!5m2!1sen!2sus"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default Contact; 