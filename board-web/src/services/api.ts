import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.trello.com/1/',
});


export default api;

