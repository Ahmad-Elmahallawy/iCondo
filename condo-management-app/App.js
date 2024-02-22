import { StatusBar } from 'expo-status-bar';
import {SafeAreaProvider} from "react-native-safe-area-context"
import {StyleSheet, Text, View, ImageBackground, SafeAreaView, Dimensions} from 'react-native';
import Splash from './screens/auth/Splash/index'
import SignUp from './screens/auth/SignUpAsClient/index'
import React, {Component, useState} from "react";
import SignIn from "./screens/auth/SignIn";
import SignUpAsAdmin from "./screens/auth/SignUpAsAdmin";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {colors} from "./utils/colors";
const Stack = createNativeStackNavigator();


export default function App() {
    const isSignedIn = true;
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
                            <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
                            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                            <Stack.Screen name="SignUpAsAdmin" component={SignUpAsAdmin} options={{ headerShown: false }} />

                        </>
                    ) : (
                        <>
                            <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                            <Stack.Screen name="Signin" component={SignIn} options={{ headerShown: false }} />
                            <Stack.Screen name="Signup" component={SignUp} options={{ headerShown: false }} />
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};