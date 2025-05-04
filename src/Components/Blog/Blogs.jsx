import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Blogs.css';

const API_URL = 'http://localhost:5000';

const truncate = (text, wordLimit = 30) => {
  if (!text) return '';
  const words = text.split(' ');
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(' ') + '...';
};

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/blogs`);
        setBlogs(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <div className="loading">Loading blogs...</div>;

  return (
    <div className="blogs-page">
      <h2 className="blogs-title">Blogs</h2>
      <div className="blogs-list">
        {blogs.length === 0 ? (
          <div>No blogs found.</div>
        ) : (
          blogs.map(blog => (
            <div className="blog-card" key={blog._id} onClick={() => navigate(`/blogs/${blog._id}`)}>
              <img src={blog.image || 'default-blog.jpg'} alt={blog.title} className="blog-card-img" />
              <div className="blog-card-content">
                <h3 className="blog-card-title">{blog.title}</h3>
                <div className="blog-card-date">{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ''}</div>
                <p className="blog-card-snippet">{truncate(blog.content, 30)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Blogs; 