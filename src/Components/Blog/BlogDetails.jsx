import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Blogs.css';

const API_URL = 'http://localhost:5000';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/blogs/${id}`);
        setBlog(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <div className="loading">Loading blog...</div>;
  if (!blog) return <div className="error">Blog not found</div>;

  return (
    <div className="blog-details-page">
      <div className="blog-details-img-container">
        <img src={blog.image || 'default-blog.jpg'} alt={blog.title} className="blog-details-img" />
      </div>
      <div className="blog-details-card">
        <h1 className="blog-details-title">{blog.title}</h1>
        <div className="blog-details-date">{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ''}</div>
        <div className="blog-details-content">{blog.content}</div>
      </div>
    </div>
  );
};

export default BlogDetails; 