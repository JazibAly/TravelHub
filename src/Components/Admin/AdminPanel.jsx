import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const API_URL = 'http://localhost:5000';

const Sidebar = ({ selected, setSelected }) => (
  <div className="admin-sidebar">
    <button className={selected === 'add' ? 'active' : ''} onClick={() => setSelected('add')}>Add Tour</button>
    <button className={selected === 'edit' ? 'active' : ''} onClick={() => setSelected('edit')}>Edit Tour</button>
    <button className={selected === 'remove' ? 'active' : ''} onClick={() => setSelected('remove')}>Remove Tour</button>
    <button className={selected === 'addBlog' ? 'active' : ''} onClick={() => setSelected('addBlog')}>Add Blog</button>
    <button className={selected === 'editBlog' ? 'active' : ''} onClick={() => setSelected('editBlog')}>Edit Blog</button>
    <button className={selected === 'removeBlog' ? 'active' : ''} onClick={() => setSelected('removeBlog')}>Remove Blog</button>
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

const TourList = ({ mode, tours, loading, startEdit, handleDelete }) => (
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

const BlogForm = ({ onSubmit, formData, setFormData, isEdit, onCancel }) => (
  <form onSubmit={onSubmit} className="tour-form">
    <div className="form-group">
      <input type="text" placeholder="Title" name="title" value={formData.title} onChange={e => setFormData(f => ({ ...f, title: e.target.value }))} required />
    </div>
    <div className="form-group">
      <input type="text" placeholder="Image URL" name="image" value={formData.image} onChange={e => setFormData(f => ({ ...f, image: e.target.value }))} />
    </div>
    <div className="form-group">
      <textarea placeholder="Content" name="content" value={formData.content} onChange={e => setFormData(f => ({ ...f, content: e.target.value }))} required />
    </div>
    <button type="submit" className="btn-submit">{isEdit ? 'Update Blog' : 'Add Blog'}</button>
    {isEdit && <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>}
  </form>
);

const BlogList = ({ mode, blogs, loading, startEdit, handleDelete }) => (
  <div className="tour-list">
    {loading ? <div>Loading...</div> : blogs.length === 0 ? <div>No blogs found.</div> : (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(blog => (
            <tr key={blog._id}>
              <td>{blog.title}</td>
              <td>{blog.createdAt ? blog.createdAt.substr(0, 10) : ''}</td>
              <td>
                {mode === 'editBlog' && <button onClick={() => startEdit(blog)}>Edit</button>}
                {mode === 'removeBlog' && <button onClick={() => handleDelete(blog._id)} className="btn-delete">Delete</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

const AdminPanel = () => {
  const [selected, setSelected] = useState('add');
  // Tours
  const [tours, setTours] = useState([]);
  const [formData, setFormData] = useState({ destination: '', location: '', date: '', duration: '', description: '', fees: '', image: '' });
  const [editId, setEditId] = useState(null);
  // Blogs
  const [blogs, setBlogs] = useState([]);
  const [blogFormData, setBlogFormData] = useState({ title: '', image: '', content: '' });
  const [editBlogId, setEditBlogId] = useState(null);
  // Shared
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchTours(); fetchBlogs(); }, []);

  // Tours
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
  // Blogs
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/blogs`);
      setBlogs(res.data);
    } catch (err) {
      setError('Failed to fetch blogs');
    }
    setLoading(false);
  };

  // Add or Edit Tour
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
  // Add or Edit Blog
  const handleBlogSubmit = async e => {
    e.preventDefault();
    setError(null); setSuccess(null);
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } };
      if (editBlogId) {
        await axios.put(`${API_URL}/api/blogs/${editBlogId}`, blogFormData, config);
        setSuccess('Blog updated successfully!');
      } else {
        await axios.post(`${API_URL}/api/blogs`, blogFormData, config);
        setSuccess('Blog added successfully!');
      }
      setBlogFormData({ title: '', image: '', content: '' });
      setEditBlogId(null);
      fetchBlogs();
    } catch (err) {
      setError('Error saving blog.');
    }
  };

  // Start editing tour
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
  // Start editing blog
  const startEditBlog = blog => {
    setEditBlogId(blog._id);
    setBlogFormData({
      title: blog.title,
      image: blog.image || '',
      content: blog.content
    });
    setSelected('editBlog');
    setError(null); setSuccess(null);
  };

  // Delete tour
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
  // Delete blog
  const handleDeleteBlog = async id => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    setError(null); setSuccess(null);
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      await axios.delete(`${API_URL}/api/blogs/${id}`, config);
      setSuccess('Blog deleted successfully!');
      fetchBlogs();
    } catch (err) {
      setError(err.response?.data?.msg || 'Error deleting blog.');
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditId(null);
    setFormData({ destination: '', location: '', date: '', duration: '', description: '', fees: '', image: '' });
    setError(null); setSuccess(null);
  };
  const cancelEditBlog = () => {
    setEditBlogId(null);
    setBlogFormData({ title: '', image: '', content: '' });
    setError(null); setSuccess(null);
  };

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
            <TourList mode="edit" tours={tours} loading={loading} startEdit={startEdit} handleDelete={handleDelete} />
          )
        )}
        {selected === 'remove' && <TourList mode="remove" tours={tours} loading={loading} startEdit={startEdit} handleDelete={handleDelete} />}
        {selected === 'addBlog' && (
          <BlogForm onSubmit={handleBlogSubmit} formData={blogFormData} setFormData={setBlogFormData} isEdit={false} />
        )}
        {selected === 'editBlog' && (
          editBlogId ? (
            <BlogForm onSubmit={handleBlogSubmit} formData={blogFormData} setFormData={setBlogFormData} isEdit={true} onCancel={cancelEditBlog} />
          ) : (
            <BlogList mode="editBlog" blogs={blogs} loading={loading} startEdit={startEditBlog} handleDelete={handleDeleteBlog} />
          )
        )}
        {selected === 'removeBlog' && <BlogList mode="removeBlog" blogs={blogs} loading={loading} startEdit={startEditBlog} handleDelete={handleDeleteBlog} />}
      </div>
    </div>
  );
};

export default AdminPanel; 