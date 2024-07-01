// src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://api.technivor.net/api', // Replace with your backend URL
});

export default instance;
