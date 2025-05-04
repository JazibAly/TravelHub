import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './TourDetails.css';

const API_URL = 'http://localhost:5000';

const TourDetails = () => {
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/tours/${id}`);
        setTour(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!tour) {
    return <div className="error">Tour not found</div>;
  }

  return (
    <div className="tour-details">
      <div className="tour-header">
        <img src={tour.image || 'default-tour.jpg'} alt={tour.destination} />
        <h1>{tour.destination}</h1>
      </div>
      
      <div className="tour-info">
        <div className="info-section">
          <h2>Location</h2>
          <p>{tour.location}</p>
        </div>
        
        <div className="info-section">
          <h2>Date</h2>
          <p>{new Date(tour.date).toLocaleDateString()}</p>
        </div>
        
        <div className="info-section">
          <h2>Duration</h2>
          <p>{tour.duration}</p>
        </div>
        
        <div className="info-section">
          <h2>Description</h2>
          <p>{tour.description}</p>
        </div>
        
        <div className="info-section">
          <h2>Fees</h2>
          <p>${tour.fees}</p>
        </div>
      </div>
    </div>
  );
};

export default TourDetails; 