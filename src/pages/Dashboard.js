import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig'; // Import your Axios instance
import { Button, Typography, Box, Card, CardContent, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects from backend when component mounts
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/projects', {withCredentials: true});
        console.log(response)
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Handle error (show message, etc.)
      }
    };
    fetchProjects();
  }, []);

  return (
    <Box p={3}>
      {projects.length === 0 ? (
        <Box textAlign="center">
          <Typography variant="h6">You have no projects.</Typography>
          <Button variant="contained" color="primary" component={Link} to="/projects/create">
            Create a New Project
          </Button>
        </Box>
      ) : (
        <Box>
          
          <Typography variant="h4" gutterBottom>
            Your Projects
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/projects/create">
            Create a New Project
          </Button>
          {projects.map(project => (
            <Card key={project.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h5">{project.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {project.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" component={Link} to={`/projects/${project.id}/edit/1`}>
                  View Project
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;

