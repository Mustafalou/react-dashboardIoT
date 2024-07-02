import React, { useState, useEffect } from 'react';
import axios from "../axiosConfig";
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, IconButton,Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import {Button} from '@mui/material';
import {Link} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from API
    axios.get('/users', {withCredentials: true})
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);
  const handleDeleteUser = async(userId)=>{
    try{
        await axios.delete(`/users/${userId}`); // Adjust endpoint based on your backend API
      // Filter out the deleted user from the local state
      setUsers(users.filter(user => user.id !== userId));
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle error (show message, etc.)
    }
  }
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Users Page
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to="/users/create"
        sx={{ marginBottom: 2 }}
      >
        Create User
      </Button>
      <List>
        {users.map(user => (
          <ListItem key={user.id}>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.email} secondary={user.isAdmin?"Admin":"Normal"}/>
            <Box sx={{ marginLeft: 'auto' }}>
            <IconButton
              aria-label="delete"
              onClick={() => handleDeleteUser(user.id)}
              sx={{ color: 'error.main', bgcolor: 'error.light' }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Users;
