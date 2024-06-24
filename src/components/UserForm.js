// src/components/UserForm.js
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from '../axiosConfig'; // Import the axios instance

const UserForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/register', { email, password });
      console.log(response.data);
      // Optionally handle success or redirect
    } catch (error) {
      console.error('User creation failed', error);
    }
  };

  return (
    <div>
      <h2>Create User</h2>
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
          Create User
        </Button>
      </form>
    </div>
  );
};

export default UserForm;
