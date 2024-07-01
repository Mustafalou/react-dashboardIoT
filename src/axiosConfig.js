// src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.technivor.net/api', // Replace with your backend URL
});

export default instance;
