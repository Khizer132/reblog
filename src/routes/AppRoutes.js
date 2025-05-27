import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import PrivateRoutes from '../components/PrivateRoutes';
import CategoryBlogs from '../components/CategoryBlogs';
import DevOpsBlogs from '../components/DevOpsBlogs';
import DockerBlogs from '../components/DockerBlogs';
import ContainerBlogs from '../components/ContainerBlogs';
import BlogDetails from '../components/BlogDetails';
import AuthorProfile from '../components/AuthorProfile';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/blogs" element={<CategoryBlogs />} />
        <Route path="/blogs/devops" element={<DevOpsBlogs />} />
        <Route path="/blogs/docker" element={<DockerBlogs />} />
        <Route path="/blogs/containers" element={<ContainerBlogs />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/author/:name" element={<AuthorProfile />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
