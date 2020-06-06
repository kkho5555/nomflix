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

const movieAPI = {
  nowPlaying: () => api.get('movie/now_playing'),
  upcoming: () => api.get('movie/upcoming'),
  popular: () => api.get('movie/popular'),
  movieDetail: id =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: 'videos',
      },
    }),
  search: term =>
    api.get('movie/search', { params: { query: encodeURIComponent(term) } }),
};

const tvAPI = {
  topRated: () => api.get('tv/top_rated'),
  popular: () => api.get('tv/popular'),
  airingToday: () => api.get('tv/airing_today'),
  showDetail: id =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: 'videos',
      },
    }),
  search: term =>
    api.get('tv/search', { params: { query: encodeURIComponent(term) } }),
};
export default api;
