// src/components/UserUpdate.js
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from '../axiosConfig'; // Import the axios instance

const UserUpdate = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put('/users/:id', { email, password }); // Replace with your backend endpoint
      console.log(response.data);
      // Optionally handle success or redirect
    } catch (error) {
      console.error('User update failed', error);
    }
  };

  return (
    <div>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          type="password"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '1rem' }}
        >
          Update User
        </Button>
      </form>
    </div>
  );
};

export default UserUpdate;
