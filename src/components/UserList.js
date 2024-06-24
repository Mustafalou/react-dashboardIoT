// src/components/UserList.js
import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig'; // Import the axios instance
import { List, ListItem, ListItemText } from '@mui/material';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/users'); // Replace with your backend endpoint
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <List>
        {users.map(user => (
          <ListItem key={user.id}>
            <ListItemText primary={user.email} />
            {/* Add more user details here */}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UserList;
