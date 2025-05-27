import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/signup', formData);
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={headingStyle}>📝 Sign Up</h2>

        {error && (
          <div style={{ color: '#dc2626', marginBottom: '20px', fontSize: '14px' }}>
            {error}
          </div>
        )}

        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          style={inputStyle}
          minLength={3}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={inputStyle}
          minLength={6}
        />

        <button 
          type="submit" 
          style={{
            ...submitBtnStyle,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>

        <p style={loginTextStyle}>
          Already have an account?{' '}
          <button 
            onClick={() => navigate('/login')} 
            style={loginBtnStyle}
          >
            Login here
          </button>
        </p>
      </form>
    </div>
  );
}

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: 'linear-gradient(to right, #ff6a00, #ee0979)',
};

const formStyle = {
  backgroundColor: '#fff',
  padding: '40px',
  borderRadius: '12px',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '400px',
  textAlign: 'center',
};

const headingStyle = {
  marginBottom: '25px',
  color: '#333',
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  fontSize: '16px',
};

const submitBtnStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#f43f5e',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'background 0.3s ease',
};

const loginTextStyle = {
  marginTop: '20px',
  fontSize: '14px',
  color: '#555',
};

const loginBtnStyle = {
  background: 'none',
  color: '#f43f5e',
  border: 'none',
  cursor: 'pointer',
  textDecoration: 'underline',
  fontWeight: 'bold',
};

export default Signup;
