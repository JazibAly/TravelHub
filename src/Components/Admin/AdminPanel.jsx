import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const API_URL = 'http://localhost:5000';

const Sidebar = ({ selected, setSelected }) => (
  <div className="admin-sidebar">
    <button className={selected === 'add' ? 'active' : ''} onClick={() => setSelected('add')}>Add New</button>
    <button className={selected === 'edit' ? 'active' : ''} onClick={() => setSelected('edit')}>Edit</button>
    <button className={selected === 'remove' ? 'active' : ''} onClick={() => setSelected('remove')}>Remove</button>
  </div>
);

const TourForm = ({ onSubmit, formData, setFormData, isEdit, onCancel }) => (
  <form onSubmit={onSubmit} className="tour-form">
    <div className="form-group">
      <input type="text" placeholder="Destination" name="destination" value={formData.destination} onChange={e => setFormData(f => ({ ...f, destination: e.target.value }))} required />
    </div>
    <div className="form-group">
      <input type="text" placeholder="Location" name="location" value={formData.location} onChange={e => setFormData(f => ({ ...f, location: e.target.value }))} required />
    </div>
    <div className="form-group">
      <input type="date" name="date" value={formData.date} onChange={e => setFormData(f => ({ ...f, date: e.target.value }))} required />
    </div>
    <div className="form-group">
      <input type="text" placeholder="Duration (e.g., 5 days)" name="duration" value={formData.duration} onChange={e => setFormData(f => ({ ...f, duration: e.target.value }))} required />
    </div>
    <div className="form-group">
      <textarea placeholder="Description" name="description" value={formData.description} onChange={e => setFormData(f => ({ ...f, description: e.target.value }))} required />
    </div>
    <div className="form-group">
      <input type="number" placeholder="Fees" name="fees" value={formData.fees} onChange={e => setFormData(f => ({ ...f, fees: e.target.value }))} required min="0" step="0.01" />
    </div>
    <div className="form-group">
      <input type="text" placeholder="Image URL" name="image" value={formData.image} onChange={e => setFormData(f => ({ ...f, image: e.target.value }))} />
    </div>
    <button type="submit" className="btn-submit">{isEdit ? 'Update Tour' : 'Add Tour'}</button>
    {isEdit && <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>}
  </form>
);

const AdminPanel = () => {
  const [selected, setSelected] = useState('add');
  const [tours, setTours] = useState([]);
  const [formData, setFormData] = useState({ destination: '', location: '', date: '', duration: '', description: '', fees: '', image: '' });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchTours(); }, []);

  const fetchTours = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/tours`);
      setTours(res.data);
    } catch (err) {
      setError('Failed to fetch tours');
    }
    setLoading(false);
  };

  // Add or Edit
  const handleSubmit = async e => {
    e.preventDefault();
    setError(null); setSuccess(null);
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } };
      if (editId) {
        await axios.put(`${API_URL}/api/tours/${editId}`, formData, config);
        setSuccess('Tour updated successfully!');
      } else {
        await axios.post(`${API_URL}/api/tours`, formData, config);
        setSuccess('Tour added successfully!');
      }
      setFormData({ destination: '', location: '', date: '', duration: '', description: '', fees: '', image: '' });
      setEditId(null);
      fetchTours();
    } catch (err) {
      setError('Error saving tour.');
    }
  };

  // Start editing
  const startEdit = tour => {
    setEditId(tour._id);
    setFormData({
      destination: tour.destination,
      location: tour.location,
      date: tour.date ? tour.date.substr(0, 10) : '',
      duration: tour.duration,
      description: tour.description,
      fees: tour.fees,
      image: tour.image || ''
    });
    setSelected('edit');
    setError(null); setSuccess(null);
  };

  // Delete
  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this tour?')) return;
    setError(null); setSuccess(null);
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      await axios.delete(`${API_URL}/api/tours/${id}`, config);
      setSuccess('Tour deleted successfully!');
      fetchTours();
    } catch (err) {
      setError(err.response?.data?.msg || 'Error deleting tour.');
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditId(null);
    setFormData({ destination: '', location: '', date: '', duration: '', description: '', fees: '', image: '' });
    setError(null); setSuccess(null);
  };

  // List for edit/delete
  const TourList = ({ mode }) => (
    <div className="tour-list">
      {loading ? <div>Loading...</div> : tours.length === 0 ? <div>No tours found.</div> : (
        <table>
          <thead>
            <tr>
              <th>Destination</th>
              <th>Location</th>
              <th>Date</th>
              <th>Duration</th>
              <th>Fees</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tours.map(tour => (
              <tr key={tour._id}>
                <td>{tour.destination}</td>
                <td>{tour.location}</td>
                <td>{tour.date ? tour.date.substr(0, 10) : ''}</td>
                <td>{tour.duration}</td>
                <td>${tour.fees}</td>
                <td>
                  {mode === 'edit' && <button onClick={() => startEdit(tour)}>Edit</button>}
                  {mode === 'remove' && <button onClick={() => handleDelete(tour._id)} className="btn-delete">Delete</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  return (
    <div className="admin-panel-container">
      <Sidebar selected={selected} setSelected={setSelected} />
      <div className="admin-main-content">
        <h2>Admin Panel</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        {selected === 'add' && (
          <TourForm onSubmit={handleSubmit} formData={formData} setFormData={setFormData} isEdit={false} />
        )}
        {selected === 'edit' && (
          editId ? (
            <TourForm onSubmit={handleSubmit} formData={formData} setFormData={setFormData} isEdit={true} onCancel={cancelEdit} />
          ) : (
            <TourList mode="edit" />
          )
        )}
        {selected === 'remove' && <TourList mode="remove" />}
      </div>
    </div>
  );
};

export default AdminPanel; 