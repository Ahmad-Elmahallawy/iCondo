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
            await AsyncStorage.setItem('user', JSON.stringify(response.data))
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
            await AsyncStorage.setItem('user', JSON.stringify(profile)) // update local storage
            return profile;
        }
    } catch (e) {
        console.log('e profile :>> ', e);
    }
};

export const submitRegistrationKey = async (key) => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    const token = user.accessToken;
    let key_response;
    try {
        key_response = await request({
            url: `/api/registrationKeys`,
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
        if (key_response == null || key_response.data.length == 0) {
            return null;
        }
        // Create userCondo link
        const data = {
          condo: { id: key_response.data[0].condoUnit.id },
          user: { id: user.id }
        };
        const user_condo_response = await createUserCondos(data);

        // If user is a public user and becomes a rental user or condo owner, update their role
        // And if user is a rental user and becomes a condo owner, update too
        const key_role = key_response.data[0].role[0];
        const user_role = user.roles[0];
        if (user_role == 'PublicUser' && (key_role == 'rental' || key_role == 'condoOwner') ||
            user_role == 'rental' && key_role == 'condoOwner') {
            const newRole = {
              roles: key_response.data[0].role
            };
            await updateProfile(newRole);
        }

        return user_condo_response?.data;
    } catch (e) {
        console.error('Error submitting user registration key:', e);
    }
}

export const createUserCondos = async (data) => {
    try {
        let token = await AsyncStorage.getItem('auth_token');
        const user_condo_response = await request({
            url: `/api/userCondos`,
            method: 'post',
            data,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return user_condo_response?.data;
    } catch (e) {
        console.error('Error linking user with condo in UserCondo:', e);
    }
}