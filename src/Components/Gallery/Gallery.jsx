import React, { useState, useEffect } from 'react';
import './Gallery.css';
import Aos from 'aos';
import 'aos/dist/aos.css';

const galleryData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?ixlib=rb-4.0.3",
    title: "Mountain Adventure",
    category: "Adventure"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3",
    title: "Beach Paradise",
    category: "Beach"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3",
    title: "City Exploration",
    category: "City"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3",
    title: "Nature Retreat",
    category: "Nature"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3",
    title: "Cultural Experience",
    category: "Culture"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3",
    title: "Tropical Getaway",
    category: "Beach"
  }
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');
  const [filteredImages, setFilteredImages] = useState(galleryData);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredImages(galleryData);
    } else {
      setFilteredImages(galleryData.filter(item => item.category === filter));
    }
  }, [filter]);

  const categories = ['all', ...new Set(galleryData.map(item => item.category))];

  return (
    <section className="gallery-section container section">
      <div className="gallery-header">
        <span className="gallery-badge">Our Gallery</span>
        <h2>Travel Memories</h2>
        <p>Explore our collection of beautiful travel moments</p>
      </div>

      <div className="gallery-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`filter-btn ${filter === category ? 'active' : ''}`}
            onClick={() => setFilter(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {filteredImages.map((item, index) => (
          <div
            key={item.id}
            className="gallery-item"
            data-aos="fade-up"
            data-aos-delay={index * 100}
            onClick={() => setSelectedImage(item)}
          >
            <img src={item.image} alt={item.title} />
            <div className="gallery-overlay">
              <h3>{item.title}</h3>
              <p>{item.category}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content">
            <img src={selectedImage.image} alt={selectedImage.title} />
            <div className="lightbox-info">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery; 