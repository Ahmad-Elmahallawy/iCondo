import { Constants } from 'expo-constants'; // Import Constants from Expo
import axios from 'axios';

export const request = ({ url, method, data }) => {
    const API_BASE_URL = Constants.manifest.extra.API_BASE_URL; // Access environment variable

    return axios({
        method: method || 'get',
        url: `${API_BASE_URL}${url}`,
        data,
    });
}
