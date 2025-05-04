import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import About from './components/About/About';
import Services from './components/Services/Services';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import AdminDashboard from './components/Admin/AdminDashboard';
import Main from './components/Main/Main';
import TourDetails from './components/Tour/TourDetails';
import AdminPanel from './components/Admin/AdminPanel';
import Blogs from './components/Blog/Blogs';
import BlogDetails from './components/Blog/BlogDetails';

function AppContent() {
  const location = useLocation();
  const hideNavAndFooter =
    location.pathname === '/login' ||
    location.pathname === '/register';

  return (
    <div className="App">
      {!hideNavAndFooter && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/tours" element={<Main />} />
        <Route path="/tour/:id" element={<TourDetails />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
      </Routes>
      {!hideNavAndFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;