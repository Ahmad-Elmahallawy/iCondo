import React from 'react'
import { View} from 'react-native'
import {styles} from "./styles";
import Button from "../../../Component/Button/index"
import AuthHeader from "../../../Component/AuthHeader";
import Input from "../../../Component/Input";
const SignUp = () => {
    return (
        <View style={styles.container}>
            <AuthHeader title="Sign Up"/>
            <Input label='Email'/>
        </View>
    )
}
export default SignUp;