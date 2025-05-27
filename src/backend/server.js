const express = require('express');
const Redis = require('ioredis');
const cors = require('cors');
const bcrypt = require('bcrypt');

console.log('Starting server initialization...');

const app = express();
console.log('Express app created');

const redis = new Redis(process.env.REDIS_URL || 'redis://redis:6379');
console.log('Redis client created');

redis.on('connect', () => {
  console.log('Successfully connected to Redis');
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

app.use(cors());
app.use(express.json());


const sampleBlogs = [
  {
    id: '1',
    title: 'Introduction to DevOps',
    author: 'John Doe',
    category: 'devops',
    content: 'DevOps is a set of practices that combines software development and IT operations...'
  },
  {
    id: '2',
    title: 'Docker Fundamentals',
    author: 'Jane Smith',
    category: 'docker',
    content: 'Docker is a platform for developing, shipping, and running applications in containers...'
  },
  {
    id: '3',
    title: 'Container Orchestration with Kubernetes',
    author: 'Mike Johnson',
    category: 'container',
    content: 'Kubernetes is an open-source container orchestration platform that automates the deployment...'
  },
  {
    id: '4',
    title: 'CI/CD Pipeline Implementation',
    author: 'Sarah Wilson',
    category: 'devops',
    content: 'Continuous Integration and Continuous Deployment (CI/CD) is a method to frequently deliver...'
  },
  {
    id: '5',
    title: 'Docker Compose for Multi-Container Apps',
    author: 'Alex Brown',
    category: 'docker',
    content: 'Docker Compose is a tool for defining and running multi-container Docker applications...'
  },
  {
    id: '6',
    title: 'Container Security Best Practices',
    author: 'Emily Davis',
    category: 'container',
    content: 'Securing containers is crucial for maintaining the integrity and safety of your applications...'
  }
];


const sampleAuthors = [
  {
    name: 'John Doe',
    bio: 'Senior DevOps Engineer with 10+ years of experience in cloud infrastructure and automation.',
    expertise: ['DevOps', 'AWS', 'Kubernetes', 'CI/CD'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
  },
  {
    name: 'Jane Smith',
    bio: 'Docker expert and cloud architect specializing in containerization strategies.',
    expertise: ['Docker', 'Microservices', 'Cloud Architecture'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
  },
  {
    name: 'Mike Johnson',
    bio: 'Container orchestration specialist with deep knowledge of Kubernetes and container security.',
    expertise: ['Kubernetes', 'Container Security', 'DevSecOps'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike'
  },
  {
    name: 'Sarah Wilson',
    bio: 'DevOps consultant focusing on CI/CD pipeline optimization and team collaboration.',
    expertise: ['CI/CD', 'Team Leadership', 'Automation'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  },
  {
    name: 'Alex Brown',
    bio: 'Full-stack developer with expertise in Docker and microservices architecture.',
    expertise: ['Docker', 'Microservices', 'Node.js'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
  },
  {
    name: 'Emily Davis',
    bio: 'Security specialist focusing on container and cloud infrastructure security.',
    expertise: ['Security', 'Docker', 'Cloud Infrastructure'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily'
  }
];


async function initializeRedis() {
  console.log('Starting Redis initialization...');
  try {
    
    await redis.flushall();
    console.log('Cleared existing Redis data');
    
    console.log('Storing author data...');
    for (const author of sampleAuthors) {
      console.log(`Storing author: ${author.name}`);
      await redis.set(`author:${author.name}`, JSON.stringify(author));
      await redis.del(`author_blogs:${author.name}`);
    }
    
  
    console.log('Storing blog data...');
    for (const blog of sampleBlogs) {
      console.log(`Storing blog: ${blog.title}`);
      await redis.set(`blog:${blog.id}`, JSON.stringify(blog));
      
      // Add blog ID to category set
      await redis.sadd(`category:${blog.category}`, blog.id);
      
      // Add blog ID to author's blog set
      console.log(`Adding blog ${blog.id} to author ${blog.author}'s blog set`);
      await redis.sadd(`author_blogs:${blog.author}`, blog.id);
    }
    
    for (const author of sampleAuthors) {
      const storedAuthor = await redis.get(`author:${author.name}`);
      const authorBlogs = await redis.smembers(`author_blogs:${author.name}`);
      console.log(`Verification - Author ${author.name}:`, {
        authorData: JSON.parse(storedAuthor),
        blogCount: authorBlogs.length,
        blogIds: authorBlogs
      });
    }
    
    console.log('Redis initialized with sample data');
  } catch (error) {
    console.error('Error initializing Redis:', error);
    throw error; // Re-throw to ensure we know if initialization fails
  }
}

// Initialize Redis when server starts
initializeRedis().catch(error => {
  console.error('Failed to initialize Redis:', error);
  process.exit(1);
});


app.get('/api/category/:category', async (req, res) => {
  console.log(`Fetching blogs for category: ${req.params.category}`);
  try {
    const category = req.params.category.toLowerCase();
    
    // Get all blog IDs for the category
    const blogIds = await redis.smembers(`category:${category}`);
    console.log(`Found ${blogIds.length} blogs in category ${category}`);
    
    // Get blog details for each ID
    const blogs = await Promise.all(
      blogIds.map(async (id) => {
        const blogJson = await redis.get(`blog:${id}`);
        return JSON.parse(blogJson);
      })
    );
    
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// Get single blog by ID
app.get('/api/blog/:id', async (req, res) => {
  console.log(`Fetching blog with ID: ${req.params.id}`);
  try {
    const blogJson = await redis.get(`blog:${req.params.id}`);
    if (!blogJson) {
      console.log(`Blog ${req.params.id} not found`);
      res.status(404).json({ error: 'Blog not found' });
    } else {
      res.json(JSON.parse(blogJson));
    }
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
});

app.post('/api/signup', async (req, res) => {
  console.log('Received signup request:', req.body.username);
  try {
    const { username, password } = req.body;

    
    if (!username || username.length < 3) {
      return res.status(400).json({ error: 'Username must be at least 3 characters long' });
    }
    
    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    const existingUser = await redis.get(`user:${username}`);
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user in Redis
    await redis.set(`user:${username}`, JSON.stringify({
      username,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    }));

    console.log(`User ${username} created successfully`);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error in signup:', error);
    res.status(500).json({ error: 'Failed to create account' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  console.log('Received login request:', req.body.username);
  try {
    const { username, password } = req.body;

    // Get user from Redis
    const userJson = await redis.get(`user:${username}`);
    if (!userJson) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = JSON.parse(userJson);

    // Compare password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const sessionToken = Math.random().toString(36).substring(2);
    await redis.set(`session:${sessionToken}`, username, 'EX', 24 * 60 * 60); // Expires in 24 hours

    console.log(`User ${username} logged in successfully`);
    res.json({ 
      message: 'Login successful',
      token: sessionToken,
      username: user.username
    });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get author profile and their blogs
app.get('/api/author/:name', async (req, res) => {
  const authorName = req.params.name;
  console.log(`Fetching author profile for: ${authorName}`);
  
  try {
    // Get author details
    console.log('Attempting to fetch author data from Redis...');
    const authorJson = await redis.get(`author:${authorName}`);
    
    if (!authorJson) {
      console.log(`Author ${authorName} not found in Redis`);
      return res.status(404).json({ error: 'Author not found' });
    }
    
    const author = JSON.parse(authorJson);
    console.log('Author data found:', author);
    
    // Get author's blog IDs
    console.log('Fetching author blog IDs...');
    const blogIds = await redis.smembers(`author_blogs:${authorName}`);
    console.log('Blog IDs found:', blogIds);
    
    // Get blog details for each ID
    console.log('Fetching individual blog details...');
    const blogs = await Promise.all(
      blogIds.map(async (id) => {
        const blogJson = await redis.get(`blog:${id}`);
        if (!blogJson) {
          console.log(`Warning: Blog ${id} not found for author ${authorName}`);
          return null;
        }
        return JSON.parse(blogJson);
      })
    );
    
    // Filter out any null blogs
    const validBlogs = blogs.filter(blog => blog !== null);
    console.log(`Successfully found ${validBlogs.length} blogs for author ${authorName}`);
    
    res.json({ 
      author,
      blogs: validBlogs
    });
  } catch (error) {
    console.error('Error in /api/author/:name endpoint:', error);
    res.status(500).json({ 
      error: 'Failed to fetch author profile',
      details: error.message 
    });
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all to serve React's index.html for any non-API route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
