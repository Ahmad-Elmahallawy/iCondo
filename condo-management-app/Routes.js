import { StatusBar } from 'expo-status-bar';
import {SafeAreaProvider} from "react-native-safe-area-context"
import {StyleSheet, Text, View, ImageBackground, SafeAreaView, Dimensions, Image} from 'react-native';
import Splash from './screens/auth/Splash/index'
import SignUp from './screens/auth/SignUpAsClient/index'
import React, {Component, useState, useEffect, useContext} from "react";
import SignIn from "./screens/auth/SignIn";
import SignUpAsAdmin from "./screens/auth/SignUpAsAdmin";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {colors} from "./utils/colors";
import Home from "./screens/app/Home";
import Favorites from "./screens/app/Favorites";
import Profile from "./screens/app/Profile";
import ProductDetails from "./Component/CondoDetails";
import CreateListing from "./screens/app/CreateListing";
import MyListings from "./screens/app/MyListings";
import Settings from "./screens/app/Settings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {UserContext} from "./App";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
            <Stack.Screen name="CreateListing" component={CreateListing} options={{ headerShown: false }} />
            <Stack.Screen name="MyListings" component={MyListings} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
const Tabs = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let icon;

                if (route.name === 'Home') {
                    icon = focused
                        ? require('./assets/home_active.png')
                        : require('./assets/home.png');
                } else if (route.name === 'ProfileStack') {
                    icon = focused
                        ? require('./assets/profile_active.png')
                        : require('./assets/profile.png');
                } else if (route.name === 'Favorites') {
                    icon = focused
                        ? require('./assets/bookmark_active.png')
                        : require('./assets/bookmark.png');
                }

                return <Image style={{ width: 24, height: 24 }} source={icon} />
            },
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: { borderTopColor: colors.grey }
        })}
    >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Favorites" component={Favorites} />
        <Tab.Screen name="ProfileStack" component={ProfileStack} />
    </Tab.Navigator>
)

const Routes = () => {
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem('auth_token')
            setUser({ token })
        })()
    }, [])

    const theme = {
        colors: {
            background: colors.white,
        }
    }

    return (
        <SafeAreaProvider>
            <NavigationContainer theme={theme}>
                <Stack.Navigator>
                    {user?.token ? (
                        <>
                            <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
                            <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: false }} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
                            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                            <Stack.Screen name="SignUpAsAdmin" component={SignUpAsAdmin} options={{ headerShown: false }} />

                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};
export default React.memo(Routes);
