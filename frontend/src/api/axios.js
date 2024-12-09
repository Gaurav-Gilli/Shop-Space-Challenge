import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',  // Backend URL (assuming your backend is running on port 5000)
});

export default axiosInstance;
