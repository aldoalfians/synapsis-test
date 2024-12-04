import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gorest.co.in/public/v1',
});

export default api;
