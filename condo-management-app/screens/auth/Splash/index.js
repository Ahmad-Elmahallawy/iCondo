import React from 'react'
import {Image, Pressable, Text, View} from 'react-native'
import {styles} from "./styles";
import Button from "../../../Component/Button/index"
const Splash = ({ navigation }) => {
    const onSignUp = () => {
        navigation.navigate('SignUp')
    }

    const onSignIn = () => {
        navigation.navigate('SignIn')
    }
    return (
        <View style={styles.container}>
            <Image resizeMode='contain' style={styles.image} source={require('../../../assets/LoadIcon.png')}/>
            <View style={styles.titleContainer}>
            <Text style={styles.title}>Welcome to</Text>
            <Text style={styles.innerTitle}>Condo Management System</Text>
            </View>
            <Button onPress={onSignUp} title="Sign Up"></Button>
            <Pressable onPress={onSignIn} hitSlop={20}>
                <Text style={styles.footerTyper}>Sign In</Text>
            </Pressable>
        </View>
    )
}
export default Splash;