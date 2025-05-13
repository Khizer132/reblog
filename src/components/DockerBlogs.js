import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const dockerBlogs = [
  {
    id: 1,
    title: 'Getting Started with Docker',
    content: 'Learn the basics of Docker containers and how to get started with containerization.',
    author: 'Sarah Wilson',
    date: '2024-03-15'
  },
  {
    id: 2,
    title: 'Docker Compose in Production',
    content: 'Best practices for using Docker Compose in production environments.',
    author: 'Tom Brown',
    date: '2024-03-14'
  }
];

const DockerBlogs = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1950&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '2rem'
    }}>
      <Container maxWidth="lg">
        <Box sx={{ position: 'relative', mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/categories')}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              color: 'white',
              backgroundColor: 'rgba(0, 163, 224, 0.8)',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                backgroundColor: 'rgba(0, 163, 224, 0.9)',
              },
              borderRadius: '8px',
              py: 1,
              px: 3,
            }}
          >
            Back to Categories
          </Button>
          
          <Typography variant="h2" 
            component="h1" 
            sx={{ 
              color: 'white', 
              textAlign: 'center',
              fontSize: '3rem',
              mb: 4,
              mt: 2
            }}>
            Docker Blogs
          </Typography>

          <Box sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)',
            borderRadius: '12px',
            p: 2,
            mb: 4
          }}>
            <input
              type="text"
              placeholder="Search blogs..."
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1.1rem',
                backgroundColor: 'transparent',
                border: 'none',
                color: 'white',
                outline: 'none',
              }}
            />
          </Box>
        </Box>

        {dockerBlogs.map((blog) => (
          <Box
            key={blog.id}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(8px)',
              borderRadius: '12px',
              p: 4,
              mb: 3,
              color: 'white',
              textAlign: 'center'
            }}
          >
            <Typography variant="h4" sx={{ mb: 2 }}>
              {blog.title}
            </Typography>
            
            <Typography sx={{ 
              mb: 2, 
              color: 'rgba(255, 255, 255, 0.7)',
              fontStyle: 'italic' 
            }}>
              Author: {blog.author}
            </Typography>
            
            <Typography sx={{ mb: 3 }}>
              {blog.content}
            </Typography>

            <Button
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate(`/blog/${blog.id}`)}
              sx={{
                backgroundColor: '#00b8d4',
                color: 'white',
                px: 4,
                py: 1,
                borderRadius: '25px',
                '&:hover': {
                  backgroundColor: '#00a0bc',
                },
                textTransform: 'none',
                fontSize: '1rem'
              }}
            >
              Read More
            </Button>
          </Box>
        ))}
      </Container>
    </div>
  );
};

export default DockerBlogs;
