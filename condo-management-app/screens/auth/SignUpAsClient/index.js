import React, {useState} from 'react'
import {Alert ,ScrollView, View, Text} from 'react-native'
import {styles} from "./styles";
import Button from "../../../Component/Button/index"
import AuthHeader from "../../../Component/AuthHeader";
import Input from "../../../Component/Input";
import Checkbox from "../../../Component/Checkbox";
import Separator from "../../../Component/Separator";
import { SafeAreaView } from 'react-native-safe-area-context';
import {request} from "../../../utils/request";

const SignUp = ({ navigation }) => {
    const [checked, setChecked] = useState(false);
    const [values, setValues] = useState({})
    const onSignIn = () => {
        navigation.navigate('SignIn')
    }
    const onSignUpAsAdmin = () => {
        navigation.navigate('SignUpAsAdmin')
    }
    const onBack = () => {
        navigation.goBack()
    }
    const onChange = (key, value) => {
        setValues(v => ({...v, [key]: value}))
    }

    const onSubmit = async () => {
        try {
            if (!values?.fullName || !values?.email || !values?.password || !values?.confirmPassword) {
                Alert.alert('All fields are required');
                return;
            }

            if (values?.password !== values?.confirmPassword) {
                Alert.alert('Passwords do not match');
                return;
            }

            if (!checked) {
                Alert.alert('Please agree to the terms');
                return;
            }

            const response = await request({
                url: '/user/register',
                method: 'post',
                data: values,
            });
            console.log('response :>> ', response);
        } catch(error) {
            console.log('error :>> ', error);
        }
    }
    return (
        <ScrollView style={styles.container}>
            <AuthHeader onBackPress={onBack} title="Sign Up" />

            <Input value={values.fullName} onChangeText={(v) => onChange('fullName', v)} label="Name" placeholder="John Doe" />
            <Input value={values.email} onChangeText={(v)=> onChange('email', v)} label="E-mail" placeholder="example@gmail.com" />
            <Input value={values.password} onChangeText={(v) => onChange('password', v)} isPassword label="Password" placeholder="*******" />


            <Button onPress={onSubmit} style={styles.button} title="Sign Up"  />

            <Separator/>
            <Text style={styles.footerText}>
                Or Sign Up
                <Text onPress={onSignUpAsAdmin} style={styles.footerLink}> As Admin</Text>
            </Text>

            <Text style={styles.footerText}>
                Already have an account?
                <Text onPress={onSignIn} style={styles.footerLink}> Sign In</Text>
            </Text>
        </ScrollView>
    )
}

export default React.memo(SignUp);