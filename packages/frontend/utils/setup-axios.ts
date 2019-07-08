import axios from 'axios';

if (process.env.NODE_ENV !== 'production') {
  axios.defaults.baseURL = 'https://voices-to-emotions.com';
}
