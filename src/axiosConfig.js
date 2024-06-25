// src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend URL
});
instance.interceptors.request.use(
  config =>{
    const token = localStorage.getItem("accesToken");
    if (token){
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error=>{
    return Promise.reject(error);
  }
)
export default instance;
