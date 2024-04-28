import React, {useContext, useState} from 'react'
import {Alert ,ScrollView, View, Text} from 'react-native'
import {styles} from "./styles";
import Button from "../../../Component/Button/index"
import AuthHeader from "../../../Component/AuthHeader";
import Input from "../../../Component/Input";
import Checkbox from "../../../Component/Checkbox";
import Separator from "../../../Component/Separator";
import { SafeAreaView } from 'react-native-safe-area-context';
import {request} from "../../../utils/request";
import {signup} from "../../../utils/backendRequest";
import {UserContext} from "../../../App";

const SignUp = ({ navigation }) => {
    const [checked, setChecked] = useState(false);
    const [values, setValues] = useState({})
    const { setUser } = useContext(UserContext);

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
            if (!values?.firstName || !values?.lastName || !values?.username || !values?.email || !values?.phoneNumber || !values?.password) {
                Alert.alert('All fields are required');
                return;
            }
            values.roles = ["PublicUser"]
            const token = await signup(values);
            console.log(token)
            setUser({token})

            console.log('token :>> ', token);
        } catch (error) {
            console.log('error :>> ', error);
        }
    }

    return (
        <ScrollView style={styles.container}>
            <AuthHeader onBackPress={onBack} title="Sign Up As Client" />

            <Input value={values.firstName} onChangeText={(v) => onChange('firstName', v)} label="First Name" placeholder="John" />
            <Input value={values.lastName} onChangeText={(v) => onChange('lastName', v)} label="Last Name" placeholder="Doe" />
            <Input value={values.username} onChangeText={(v) => onChange('username', v)} label="Username" placeholder="JohnDoe123" />
            <Input value={values.email} onChangeText={(v)=> onChange('email', v)} label="E-mail" placeholder="example@gmail.com" />
            <Input value={values.phoneNumber} onChangeText={(v)=> onChange('phoneNumber', v)} label="Phone number" placeholder="111-111-111" />
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