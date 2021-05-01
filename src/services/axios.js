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

export default instance;
