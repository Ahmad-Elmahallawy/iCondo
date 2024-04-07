import AsyncStorage from "@react-native-async-storage/async-storage";
import {request} from "./request";

export const signup = async (values) => {
    try {
        const response = await request({
            url: '/api/users',
            method: 'post',
            data: values,
        });

        if (response) {
            const { username, password } = values;
            const loginResponse = await login({ username, password });

            return loginResponse;
        }
    } catch (e) {
        console.log('e signup :>> ', e);
    }
};

export const login = async (values) => {
    console.log(values)
    try {
        const response = await request({
            url: '/api/login',
            method: 'post',
            data: values,
        });
        console.log(response.data)
        if (response?.data?.accessToken) {
            await AsyncStorage.setItem('auth_token', response?.data?.accessToken);
            return response?.data?.accessToken;
        }
    } catch (e) {
        console.log('e login :>> ', e);
    }
};