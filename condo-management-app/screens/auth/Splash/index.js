import React from 'react'
import {Image, Pressable, Text, View} from 'react-native'
import {styles} from "./styles";
import Button from "../../../Component/Button/index"
const Splash = () => {
    return (
        <View style={styles.container}>
            <Image resizeMode='contain' style={styles.image} source={require('../../../assets/LoadIcon.png')}/>
            <View style={styles.titleContainer}>
            <Text style={styles.title}>Welcome to</Text>
            <Text style={styles.innerTitle}>Condo Management System</Text>
            </View>
            <Button title="Sign Up"></Button>
            <Pressable hitSlop={20}>
                <Text style={styles.footerTyper}>Sign In</Text>
            </Pressable>
        </View>
    )
}
export default Splash;