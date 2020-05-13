import Axios from 'axios';
import { makeUseAxios } from 'axios-hooks';
import { AuthenticationModal } from '@/components';

const instance = Axios.create();

instance.defaults.headers['Cache-Control'] = 'no-cache';
instance.defaults.baseURL = '/api';

instance.interceptors.request.use((config) => {
    config.headers['X-XSRF-TOKEN'] = sessionStorage.getItem('user')['accessToken'] || '';
    return config;
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            AuthenticationModal.show();
        }
        return error;
    }
);

const requestMethod = { GET: 'get', POST: 'post', PUT: 'put', DELETE: 'delete' };

const useAxios = makeUseAxios(instance);

export default instance;
export { useAxios, requestMethod };
