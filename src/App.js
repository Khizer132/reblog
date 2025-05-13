// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import CategoryBlogs from './components/CategoryBlogs';
import BlogDetails from './components/BlogDetails';
import AuthorProfile from './components/AuthorProfile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/categories" element={<CategoryBlogs />} />
          <Route path="/category/:category" element={<CategoryBlogs />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/author/:name" element={<AuthorProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

