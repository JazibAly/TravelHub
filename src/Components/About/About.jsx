import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about-section container section">
      <div className="about-header">
        <span className="about-badge">About Us <span role="img" aria-label="globe">🌍</span></span>
        <div className="about-main">
          <div className="about-text">
            <h2>Traveling Opens The Door To Creating <span className="about-highlight">Memories</span></h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempus massa vitae elit consectetur, ut convallis massa ultricies. Duis hendrerit turpis quis tincidunt lobortis. Nullam vel faucibus mauris.</p>
          </div>
          <div className="about-illustration">
            {/* Replace src with your own illustration if available */}
            <img src="https://th.bing.com/th/id/R.5ce73fb928695ecfc31f30e548915394?rik=Z8lsfSiGLWORkg&pid=ImgRaw&r=0" alt="Travel Illustration" />
          </div>
        </div>
      </div>
      {/* <div className="contact-section">
        <span className="contact-badge">Contact Us</span>
        <div className="contact-box">
          <div className="contact-info">
            <p><b>Contact No:</b> +1 123-456-7890</p>
            <p><b>Email:</b> contact@example.com</p>
          </div>
          <form className="contact-form">
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <input type="tel" placeholder="Phone" />
            <textarea placeholder="Message" rows="3" required></textarea>
            <button className="btn" type="submit">Submit</button>
          </form>
        </div>
      </div> */}
      <div className="subscribe-section">
        <h3>Subscribe to get Useful Traveling Information</h3>
        <form className="subscribe-form">
          <input type="email" placeholder="Enter Your Email" required />
          <button className="btn" type="submit">Subscribe</button>
        </form>
        <p className="subscribe-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempus massa vitae elit consectetur, ut convallis massa ultricies.</p>
      </div>
    </section>
  );
};

export default About; 