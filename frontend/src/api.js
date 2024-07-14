// src/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5050';

export const fetchProjects = async () => {
  const response = await axios.get(`${BASE_URL}/api/projects`);
  return response.data;
};

export const createSampleData = async () => {
  const response = await axios.post(`${BASE_URL}/api/createSampleData`);
  return response.data;
};
