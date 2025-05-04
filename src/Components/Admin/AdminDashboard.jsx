import React, { useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const API_URL = 'http://localhost:5000';

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    destination: '',
    location: '',
    date: '',
    duration: '',
    description: '',
    fees: '',
    image: ''
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { destination, location, date, duration, description, fees, image } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validate form data
    if (!destination || !location || !date || !duration || !description || !fees) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to add a tour');
        return;
      }

      console.log('Submitting tour data:', formData);
      console.log('Using token:', token);

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      const res = await axios.post(`${API_URL}/api/tours`, formData, config);
      console.log('Tour creation response:', res.data);
      
      setSuccess(true);
      setFormData({
        destination: '',
        location: '',
        date: '',
        duration: '',
        description: '',
        fees: '',
        image: ''
      });
    } catch (err) {
      console.error('Error adding tour:', err);
      console.error('Error response:', err.response?.data);
      
      if (err.response?.status === 401) {
        setError('You must be logged in to add a tour');
      } else if (err.response?.data?.missingFields) {
        const missingFields = Object.entries(err.response.data.missingFields)
          .filter(([_, isMissing]) => isMissing)
          .map(([field]) => field)
          .join(', ');
        setError(`Please fill in all required fields: ${missingFields}`);
      } else if (err.response?.data?.msg) {
        setError(err.response.data.msg);
      } else {
        setError('Error adding tour. Please try again.');
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Add New Tour</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Tour added successfully!</div>}
      <form onSubmit={onSubmit} className="tour-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Destination"
            name="destination"
            value={destination}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            name="date"
            value={date}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Duration (e.g., 5 days)"
            name="duration"
            value={duration}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Description"
            name="description"
            value={description}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Fees"
            name="fees"
            value={fees}
            onChange={onChange}
            required
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Image URL"
            name="image"
            value={image}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn-submit">Add Tour</button>
      </form>
    </div>
  );
};

export default AdminDashboard; 