import Constants from 'expo-constants';
import axios from 'axios';

export const request = ({ url, method, data, headers, params }) => {
    const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;
    return axios({
        method: method || 'get',
        url: `${API_BASE_URL}${url}`,
        data,
        headers,
        params
    });
}

export const addTokenToAxios = (token) => {
    axios.defaults.headers.Authorization = token;
}
