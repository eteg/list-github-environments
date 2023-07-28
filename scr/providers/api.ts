import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'https://api.github.com',
});

axiosConfig.interceptors.response.use(
  (config) => config.data,
  (config) => {
    throw config.data;
  },
);

export default axiosConfig;
