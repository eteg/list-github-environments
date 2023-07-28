import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'https://api.github.com',
});

axiosConfig.interceptors.response.use(
  (config) => config.data,
  ({ response }) => {
    throw new Error(JSON.stringify(response?.data, null, 2));
  },
);

export default axiosConfig;
