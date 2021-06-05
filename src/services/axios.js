import Axios from 'axios';

const instance = Axios.create();

instance.defaults.baseURL = '/api';

instance.interceptors.request.use((config) => {
    let accessToken = JSON.parse(sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken'));
    if (accessToken) {
        config.headers['X-Auth-Token'] = accessToken;
    }
    return config;
});

instance.interceptors.response.use(
    (response) => {
        if (response.data.code === '00000') {
            return {
                ...response,
                code: response.data.code,
                message: response.data.message,
                data: response.data.payload,
            };
        } else {
            return Promise.reject(response);
        }
    },
    (error) => Promise.reject(error)
);

export default instance;
