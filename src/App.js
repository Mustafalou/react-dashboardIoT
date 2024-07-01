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
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<LoginRoute><Login/></LoginRoute>} path="/login"/>
          <Route element={<ProtectedRoutes/> }>
            <Route element={<Layout/>}>
              <Route element={<Dashboard/>} path="/"/>
              <Route element={<Users/>} path="/users"/>
              <Route element={<CreateUser/>} path="/users/create"/>
              <Route element={<CreateProject/>} path="/projects/create"/>
              <Route element={<Project/>} path="/projects/:id"/>
            </Route>
          </Route>
          
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
};

export default App;

