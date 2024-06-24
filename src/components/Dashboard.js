// src/components/Dashboard.js
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import UserList from './UserList';
import UserForm from './UserForm';
import UserUpdate from './UserUpdate';

const Dashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="/dashboard/users">Manage Users</Link></li>
          <li><Link to="/dashboard/create-user">Create User</Link></li>
          {/* Add more dashboard links as needed */}
        </ul>
      </nav>
      <Routes>
        <Route path="/dashboard/users" element={<UserList />} />
        <Route path="/dashboard/create-user" element={<UserForm />} />
        <Route path="/dashboard/update-user/:id" element={<UserUpdate />} />
        {/* Add more routes for user management */}
      </Routes>
    </div>
  );
};

export default Dashboard;
