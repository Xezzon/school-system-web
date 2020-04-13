import Axios from 'axios';
import { makeUseAxios } from 'axios-hooks';

const instance = Axios.create();

instance.defaults.headers['Cache-Control'] = 'no-cache';

instance.interceptors.request.use((config) => {
    config.headers['X-XSRF-TOKEN'] = sessionStorage.getItem('AccessToken') || '';
    return config;
});

instance.interceptors.response.use(
    (response) => {},
    (error) => {}
);

const requestMethod = { GET: 'get', POST: 'post', PUT: 'put', DELETE: 'delete' };

const useAxios = makeUseAxios(instance);

export default instance;
export { useAxios, requestMethod };
