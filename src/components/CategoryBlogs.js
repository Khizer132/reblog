import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const categories = ['devops', 'docker', 'container'];

const CategoryBlogs = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

  React.useEffect(() => {
    const fetchBlogs = async () => {
      try {
        if (category) {
          console.log('Fetching blogs for category:', category.toLowerCase());
          const response = await axios.get(`http://localhost:5000/api/category/${category.toLowerCase()}`);
          console.log('Received blogs:', response.data);
          setBlogs(response.data);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError(err.response?.data?.error || 'Failed to fetch blogs');
        setLoading(false);
      }
    };

    if (category) {
      fetchBlogs();
    } else {
      setLoading(false);
    }
  }, [category]);

  const backgroundStyles = {
    backgroundImage: 'url("https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1950&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const glassCard = {
    background: 'rgba(0, 0, 0, 0.4)',
    borderRadius: '20px',
    padding: '3rem 2rem',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
    color: '#ffffff',
    textShadow: '0 1px 2px rgba(0,0,0,0.8)',
    maxWidth: '800px',
    width: '100%',
  };

  if (!category) {
    return (
      <div style={backgroundStyles}>
        <div style={glassCard}>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '2rem', textAlign: 'center' }}>Choose a Blog Category</h1>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => navigate(`/category/${cat.toLowerCase()}`)}
                style={{
                  padding: '1rem 2rem',
                  backgroundColor: '#00b4d8',
                  border: 'none',
                  color: '#fff',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
                onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
              >
                {cat} Blogs
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={backgroundStyles}>
        <div style={glassCard}>
          <div style={{ textAlign: 'center', fontSize: '1.2rem', color: '#fff' }}>Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={backgroundStyles}>
        <div style={glassCard}>
          <div style={{ textAlign: 'center', color: '#ff6b6b', marginBottom: '1rem' }}>{error}</div>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '0.8rem 1.5rem',
              backgroundColor: '#00b4d8',
              border: 'none',
              color: '#fff',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Back to Categories
          </button>
        </div>
      </div>
    );
  }

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={backgroundStyles}>
      <div style={glassCard}>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '1rem' }}>
          {capitalize(category)} Blogs
        </h1>

        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '1rem',
            marginBottom: '2rem',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.3)',
            fontSize: '1rem',
            outline: 'none',
            backgroundColor: 'rgba(255,255,255,0.1)',
            color: '#fff',
          }}
        />

        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '16px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            }}
          >
            <h2 style={{ fontSize: '1.6rem', color: '#fff' }}>
              <Link to={`/blog/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {blog.title}
              </Link>
            </h2>
            <p style={{ fontStyle: 'italic', color: '#ccc' }}>
              <strong>Author:</strong> {blog.author}
            </p>
            <p style={{ color: '#eee' }}>{blog.content.slice(0, 80)}...</p>
            <Link
              to={`/blog/${blog.id}`}
              style={{
                display: 'inline-block',
                marginTop: '0.8rem',
                color: '#fff',
                backgroundColor: '#00b4d8',
                padding: '0.6rem 1.2rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
            >
              Read More →
            </Link>
          </div>
        ))}

        {filteredBlogs.length === 0 && (
          <p style={{ textAlign: 'center', color: '#ddd', fontStyle: 'italic' }}>
            No blogs found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryBlogs;