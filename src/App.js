import React from 'react';
import { BrowserRouter, Routes,Route} from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './App.css';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Layout from './components/Layout';
import Users from './pages/Users';
import CreateUser from './pages/CreateUser';
import CreateProject from './pages/CreateProject';
import Project from './pages/Project';
import { AuthProvider } from './contexts/AuthContext';
import LoginRoute from './utils/LoginRoute';
import Logs from './pages/Logs';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import { MqttProvider } from './contexts/MqttContext';
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MqttProvider>
          <Routes>
            <Route element={<LoginRoute><Login/></LoginRoute>} path="/login"/>
            <Route element={<ProtectedRoutes/> }>
              <Route element={<Layout/>}>
                <Route element={<Dashboard/>} path="/"/>
                <Route element={<Users/>} path="/users"/>
                <Route element={<CreateUser/>} path="/users/create"/>
                <Route element={<CreateProject/>} path="/projects/create"/>
                <Route element={<Logs/>} path="/logs"/>
              </Route>
              
                <Route element={<Project/>} path="/projects/:projectid/edit/:pageid"/>
            </Route>
          </Routes>
        </MqttProvider>
      </AuthProvider>
    </BrowserRouter>
  )
};

export default App;

