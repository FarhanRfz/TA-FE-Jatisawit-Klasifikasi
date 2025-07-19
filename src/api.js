// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Ganti dengan URL backend Laravel kamu
  headers:{
    Accept: 'application/json',
  }
});


export default api;
