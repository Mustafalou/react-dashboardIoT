import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import InboxIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Person';
import { Button } from '@mui/material';
import {Link, Outlet} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { RxActivityLog } from "react-icons/rx";
const drawerWidth = 240;

export default function ClippedDrawer() {
    const {user, logout} = useAuth()
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={({display:'flex', justifyContent:'space-between'})}>
          <Typography variant="h6" noWrap component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
            Technivor-IoT
          </Typography>
          {user ? ( <Box display="flex" alignItems="center"> 
            <Button color="inherit" onClick={logout}>Logout</Button> 
            </Box> ) : ( <Button color="inherit" component={Link} to="/login">Login</Button> 
        )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
              <ListItem key="users" disablePadding>
                <ListItemButton component={Link} to="/users">
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="users" />
                </ListItemButton>
              </ListItem>
          </List>
          <Divider />
          <List>
          <ListItem key="logs" disablePadding>
                <ListItemButton component={Link} to="/logs">
                  <ListItemIcon>
                    <RxActivityLog />
                  </ListItemIcon>
                  <ListItemText primary="logs" />
                </ListItemButton>
              </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet/>
      </Box>
    </Box>
  );
}
