import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './TourDetails.css';
import { IoLocationSharp } from 'react-icons/io5';

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
    <div className="tour-details-modern">
      <div className="tour-image-container">
        <img src={tour.image || 'default-tour.jpg'} alt={tour.destination} className="tour-image" />
      </div>
      <div className="tour-card">
        <h1 className="tour-title">{tour.destination}</h1>
        <div className="tour-info-row">
          <span className="tour-info-item">
            <IoLocationSharp className="icon" /> {tour.location}
          </span>
          <span className="tour-info-item">
            <b>Date:</b> {new Date(tour.date).toLocaleDateString()}
          </span>
        </div>
        <div className="tour-info-row">
          <span className="tour-info-item">
            <b>Duration:</b> {tour.duration}
          </span>
          <span className="tour-info-item">
            <b>Fees:</b> ${tour.fees}
          </span>
        </div>
        <div className="tour-description-section">
          <h2>Description</h2>
          <p>{tour.description}</p>
        </div>
      </div>
    </div>
  );
};

export default TourDetails; 