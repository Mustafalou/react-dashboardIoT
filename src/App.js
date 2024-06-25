import React from 'react';
import { BrowserRouter, Routes,Route} from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './App.css';
import ProtectedRoutes from './utils/ProtectedRoutes';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Users from './pages/Users';
import CreateUser from './pages/CreateUser';
const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route element={<Login/>} path="/login"/>

          <Route element={<ProtectedRoutes/> }>
            <Route element={<Layout/>}>
              <Route element={<Dashboard/>} path="/dashboard"/>
              <Route element={<Users/>} path="/dashboard/users"/>
              <Route element={<CreateUser/>} path="/dashboard/users/create"/>
            </Route>
          </Route>
          
        </Routes>
      
    </BrowserRouter>
  )
};

export default App;

