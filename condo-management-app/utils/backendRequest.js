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
    try {
        const response = await request({
            url: '/api/login',
            method: 'post',
            data: values,
        });
        if (response?.data?.accessToken) {
            await AsyncStorage.setItem('auth_token', response?.data?.accessToken);
            await AsyncStorage.setItem('user_id', JSON.stringify(response?.data?.id))
            return response?.data?.accessToken;
        }
    } catch (e) {
        console.log('e login :>> ', e);
    }
};


export const getProfile = async () => {
    try {
        const user_id = await AsyncStorage.getItem('user_id')
        const token = await AsyncStorage.getItem('auth_token');
        const response = await request({
            url: `/api/users/${user_id}`,
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response) {
            return response?.data;
        }
    } catch (e) {
        console.log('e profile :>> ', e);
    }
};

export const updateProfile = async (data) => {
    try {
        const user_id = await AsyncStorage.getItem('user_id')
        const token = await AsyncStorage.getItem('auth_token');
        const response = await request({
            url: `/api/users/${user_id}`,
            method: 'patch',
            data,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response) {
            const profile = await getProfile();
            return profile;
        }
    } catch (e) {
        console.log('e profile :>> ', e);
    }
};

export const getRegistrationKey = async (key) => {
    try {
        const response = await request({
            url: `/api/registrationKeys}`,
            method: 'get',
            params: {
                    where: {
                        value: {
                            equals: key,
                        },
                    },
                },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (e){
        console.error('Error fetching user register key:', error);
    }
}
export const getCondoUnitRegistrationKey = async (key) => {
    try {
        const response = await request({
            url: `/api/registrationKeys}`,
            method: 'get',
            params: {
                where: {
                    value: { equals: `${key}` },
                },
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (e){
        console.error('Error fetching user register key:', error);
    }
}
