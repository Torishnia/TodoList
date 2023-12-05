import axios from 'axios';

const baseURL = 'https://todo-list-api-vercel-iota.vercel.app';

const instance = axios.create({ baseURL });

export default instance;
