import Constants from 'expo-constants';
import axios from 'axios';

export const request = ({ url, method, data, headers }) => {
    const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;
    console.log(`${API_BASE_URL}${url}`)

    return axios({
        method: method || 'get',
        url: `${API_BASE_URL}${url}`,
        data,
        headers,
    });
}

export const addTokenToAxios = (token) => {
    axios.defaults.headers.Authorization = token;
}
