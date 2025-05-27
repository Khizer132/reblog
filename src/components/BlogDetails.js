import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blog/${id}`);
        setBlog(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch blog');
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1950&q=80')] flex items-center justify-center p-8">
        <div className="max-w-3xl w-full bg-black/40 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl text-white">
          <div className="text-center text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1950&q=80')] flex items-center justify-center p-8">
        <div className="max-w-3xl w-full bg-black/40 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl text-white">
          <div className="text-center text-red-400 mb-4">{error}</div>
          <button
            onClick={() => navigate('/categories')}
            className="mx-auto block px-6 py-3 bg-cyan-500 text-white rounded-lg transition-transform hover:scale-105 focus:outline-none"
          >
            Back to Categories
          </button>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1950&q=80')] flex items-center justify-center p-8">
        <div className="max-w-3xl w-full bg-black/40 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl text-white">
          <div className="text-center text-red-400">Blog not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1950&q=80')] flex items-center justify-center p-8">
      <div className="max-w-3xl w-full bg-black/40 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl text-white">
        <h1 className="text-4xl mb-4 font-bold">{blog.title}</h1>
        
        <div className="mb-8">
          <p className="italic text-gray-300 mb-2">
            <strong>Author:</strong>{' '}
            <button
              onClick={() => navigate(`/author/${encodeURIComponent(blog.author)}`)}
              className="text-cyan-400 hover:text-cyan-300 transition-colors underline focus:outline-none"
            >
              {blog.author}
            </button>
          </p>
          <p className="italic text-gray-300">
            <strong>Category:</strong> {blog.category}
          </p>
        </div>

        <div className="bg-white/10 p-8 rounded-xl mb-8">
          <p className="leading-relaxed text-gray-100">{blog.content}</p>
        </div>

        <div className="flex space-x-4 justify-center">
          <button
            onClick={() => navigate(`/category/${blog.category.toLowerCase()}`)}
            className="px-6 py-3 bg-cyan-500 text-white rounded-lg transition-transform hover:scale-105 focus:outline-none flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to {blog.category} Blogs
          </button>
          <button
            onClick={() => navigate('/categories')}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg transition-transform hover:scale-105 focus:outline-none"
          >
            View All Categories
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;