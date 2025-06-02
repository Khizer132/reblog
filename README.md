###React Blog Application with Redis Integration

A modern blog application built with React, Node.js, and Redis, featuring a beautiful glass-morphism UI design and comprehensive blog management capabilities. This application showcases modern web development practices with a focus on performance, user experience, and scalability.

## Features

- 🎨 Modern Glass-morphism UI Design
- 📱 Fully Responsive Layout
- 🔐 User Authentication with Redis Session Management
- 📂 Category-based Blog Organization
- 👤 Author Profiles with Expertise Tags
- 🔍 Blog Search Functionality
- 💾 Redis Data Persistence
- 🚀 Docker Support for Development and Production
- 🔄 Real-time Author-Blog Relationship
- 🎯 Optimized Performance with Redis Caching

## Tech Stack

- **Frontend:**
  - React.js
  - React Router v6
  - Tailwind CSS for styling
  - Axios for API calls
  - Glass-morphism UI components

- **Backend:**
  - Node.js with Express.js
  - Redis for data storage and caching
  - Docker containerization
  - RESTful API architecture

## Prerequisites

- Node.js 18 or higher
- Docker and Docker Compose
- Redis (automatically handled by Docker)
- Git for version control

## Getting Started

### Development Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. Install dependencies:
   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd src/backend
   npm install
   ```

3. Start the application using Docker:
   ```bash
   docker-compose up
   ```

   This will start:
   - Frontend on http://localhost:3000
   - Backend on http://localhost:5000
   - Redis on port 6379

### Production Deployment

1. Build and run using production configuration:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

   This will start:
   - Frontend on port 80 (Nginx)
   - Backend on port 5000
   - Redis (internal access only)

## Project Structure

```
├── src/
│   ├── components/         # React components
│   │   ├── AuthorProfile.js  # Author profile component
│   │   ├── BlogDetails.js    # Blog detail view
│   │   ├── CategoryBlogs.js  # Category-wise blog listing
│   │   └── ...
│   ├── backend/           # Node.js backend
│   │   ├── server.js        # Express server setup
│   │   └── package.json     # Backend dependencies
│   └── App.js            # Main React component
├── Dockerfile            # Production frontend build
├── Dockerfile.dev        # Development frontend setup
├── Dockerfile.backend    # Backend service
├── docker-compose.yml    # Development orchestration
├── docker-compose.prod.yml # Production orchestration
└── README.md
```

## Features in Detail

### Blog Categories
- DevOps - Latest practices and tools
- Docker - Containerization guides
- Container - Container orchestration
Each category displays relevant blogs with pagination and search.

### Author Profiles
- Detailed author information with avatar
- Expertise tags and skills
- List of author's blogs with quick access
- Author-specific blog filtering and sorting

### User Interface
- Glass-morphism design with blur effects
- Dark theme optimized for readability
- Responsive layout for all devices
- Smooth transitions and animations
- Interactive elements with hover states

## API Endpoints

### Blogs
- GET `/api/category/:category` - Get blogs by category
- GET `/api/blog/:id` - Get single blog details

### Authors
- GET `/api/author/:name` - Get author profile and their blogs

### Authentication
- POST `/api/signup` - User registration
- POST `/api/login` - User login with session management

## Docker Configuration

### Development
- Hot-reloading enabled for rapid development
- Volume mounts for live code updates
- Exposed ports for easy debugging
- Redis persistence with appendonly
- Environment variables for configuration

### Production
- Multi-stage builds for minimal image size
- Nginx for efficient static file serving
- Secure Redis configuration
- Environment variable management
- Container health checks

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Glass-morphism UI inspiration from modern design trends
- Redis integration for optimal performance
- Docker configuration for seamless deployment
- Community feedback and contributions
