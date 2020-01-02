import axios from 'axios';

export const get = (resource, params) => axios.get(resource, params);

export const post = (resource, params) => axios.post(resource, params);
