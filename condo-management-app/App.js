import { StatusBar } from 'expo-status-bar';
import {SafeAreaProvider} from "react-native-safe-area-context"
import {StyleSheet, Text, View, ImageBackground, SafeAreaView, Dimensions, Image} from 'react-native';
import Splash from './screens/auth/Splash/index'
import SignUp from './screens/auth/SignUpAsClient/index'
import React, {Component, useState, useEffect} from "react";
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
import Routes from './Routes';

export const UserContext = React.createContext();
export const ProfileContext = React.createContext();
export const ServicesContext = React.createContext([]);
const App = () => {
    const [user, setUser] = useState();
    const [profile, setProfile] = useState();
    const [services, setServices] = useState();

    return (
        <SafeAreaProvider>
            <UserContext.Provider value={{ user, setUser }}>
                <ProfileContext.Provider value={{ profile, setProfile }}>
                    <ServicesContext.Provider value={{ services, setServices }}>
                        <Routes />
                    </ServicesContext.Provider>
                </ProfileContext.Provider>
            </UserContext.Provider>
        </SafeAreaProvider>
    );
};
export default App;