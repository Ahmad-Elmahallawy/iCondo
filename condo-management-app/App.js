import { StatusBar } from 'expo-status-bar';
import {SafeAreaProvider} from "react-native-safe-area-context"
import {StyleSheet, Text, View, ImageBackground, SafeAreaView, Dimensions, Image} from 'react-native';
import Splash from './screens/auth/Splash/index'
import SignUp from './screens/auth/SignUpAsClient/index'
import React, {Component, useState} from "react";
import SignIn from "./screens/auth/SignIn";
import SignUpAsAdmin from "./screens/auth/SignUpAsAdmin";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {colors} from "./utils/colors";
import Home from "./screens/app/Home";
import Favorites from "./screens/app/Favorites";
import Profile from "./screens/app/Profile";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Tabs = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let icon;

                if (route.name === 'Home') {
                    icon = focused
                        ? require('./assets/home_active.png')
                        : require('./assets/home.png');
                } else if (route.name === 'Profile') {
                    icon = focused
                        ? require('./assets/profile_active.png')
                        : require('./assets/profile.png');
                } else if (route.name === 'Favorites') {
                    icon = focused
                        ? require('./assets/bookmark_active.png')
                        : require('./assets/bookmark.png');
                }

                // You can return any component that you like here!
                return <Image style={{ width: 24, height: 24 }} source={icon} />
            },
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: { borderTopColor: colors.grey }
        })}
    >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Favorites" component={Favorites} />
        <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
)
const App = () => {
    const isSignedIn = false;
    const theme = {
        colors: {
            background: colors.white,
        }
    }

    return (
        <SafeAreaProvider>
            <NavigationContainer theme={theme}>
                <Stack.Navigator>
                    {isSignedIn ? (
                        <>
                            <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
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
export default App;