import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthorProfile = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState(null);
  const [authorBlogs, setAuthorBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        console.log('Fetching author data for:', decodeURIComponent(name));
        const response = await axios.get(`http://localhost:5000/api/author/${decodeURIComponent(name)}`);
        console.log('Author data received:', response.data);
        
        if (!response.data.author) {
          throw new Error('Author data not found in response');
        }
        
        setAuthor(response.data.author);
        setAuthorBlogs(response.data.blogs || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching author data:', err);
        setError(err.response?.data?.error || err.message || 'Failed to fetch author data');
        setLoading(false);
      }
    };

    if (name) {
      fetchAuthorData();
    }
  }, [name]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1950&q=80')] flex items-center justify-center p-8">
        <div className="max-w-4xl w-full bg-black/40 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl text-white">
          <div className="text-center text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1950&q=80')] flex items-center justify-center p-8">
        <div className="max-w-4xl w-full bg-black/40 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl text-white">
          <div className="text-center text-red-400 mb-4">{error}</div>
          <button
            onClick={() => navigate(-1)}
            className="mx-auto block px-6 py-3 bg-cyan-500 text-white rounded-lg transition-transform hover:scale-105 focus:outline-none"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1950&q=80')] flex items-center justify-center p-8">
      <div className="max-w-4xl w-full bg-black/40 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl text-white">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-cyan-500 text-white rounded-lg transition-transform hover:scale-105 focus:outline-none flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">{author.name}</h1>
          <p className="text-gray-300">{author.bio}</p>
          <div className="mt-4 flex justify-center space-x-4">
            {author.expertise.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-cyan-500/20 rounded-full text-cyan-300 text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Articles by {author.name}</h2>
          <div className="space-y-6">
            {authorBlogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white/10 rounded-xl p-6 hover:bg-white/20 transition-colors cursor-pointer"
                onClick={() => navigate(`/blog/${blog.id}`)}
              >
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-gray-300 mb-4">{blog.content.substring(0, 150)}...</p>
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>{blog.category}</span>
                  <span>{blog.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;