import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // ⬅️ Important for cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;