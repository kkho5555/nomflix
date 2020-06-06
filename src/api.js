import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

api.interceptors.request.use(config => {
  config.params = config.params || {};
  config.params['api_key'] = '563446817a04da527b7bf1f0171a5d0a';
  config.params['language'] = 'en-US';
  return config;
});

api.get('movie/550');

export default api;
