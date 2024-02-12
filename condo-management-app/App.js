import { StatusBar } from 'expo-status-bar';
import {SafeAreaProvider} from "react-native-safe-area-context"
import {StyleSheet, Text, View, ImageBackground, SafeAreaView, Dimensions} from 'react-native';
import Splash from './screens/auth/Splash/index'
import SignUp from './screens/auth/SignUp/index'
import {useState} from "react";
export default function App() {
    const [theme, setTheme] = useState('light')
  return (
    <SafeAreaView>
          <Splash/>
        {/*<SignUp/>*/}
      </SafeAreaView>
  )
}
