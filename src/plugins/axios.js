import axios from 'axios';
import store from '../store/index';
import { BASE_URL } from '../utils/routes';

const { token } = store.state;
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common.Authorization = token ? `Bearer ${token}` : '';
axios.defaults.headers.common['Content-Type'] = 'application/json';
