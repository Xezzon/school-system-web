import Axios from 'axios';
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

export default instance;
export { requestMethod };
