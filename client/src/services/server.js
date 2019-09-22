import axios from 'axios';

const ax = axios.create({
  baseURL: 'http://35.240.237.21/'
});

export default ax;