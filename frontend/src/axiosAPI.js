import axios from 'axios'
import {apiURL} from "./config";
import {store} from "./store/configureStore";

const axiosApi = axios.create({
    baseURL: apiURL.url
})

axiosApi.interceptors.request.use(config => {
    if (store.getState().user.user) {
        const token = store.getState().user.user.token;
        config.headers.Authorization = 'token ' + token;
    }
    return config;
});

export default axiosApi