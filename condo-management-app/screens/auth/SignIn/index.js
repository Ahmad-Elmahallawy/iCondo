import React, { useState, useContext } from 'react';
import { ScrollView, Text } from 'react-native';
import AuthHeader from '../../../Component/AuthHeader';
import Button from '../../../Component/Button';
import Input from '../../../Component/Input';
import Separator from '../../../Component/Separator';
import { styles } from './styles';
import {login} from "../../../utils/backendRequest";
import {UserContext} from "../../../App";

const SignIn = ({navigation}) => {
    const [values, setValues] = useState({});
    const { setUser } = useContext(UserContext);

    const onSignUp = () => {
        navigation.navigate('SignUp')
    }

    const onChange = (key, value) => {
        setValues(v => ({ ...v, [key]: value}))
    }

    const onSubmit = async () => {
        const token = await login(values);
        setUser({token})
    }
    const onBack = () => {
        navigation.goBack()
    }
    return (
        <ScrollView style={styles.container}>
            <AuthHeader onBackPress={onBack} title="Sign In" />

            <Input value={values.username} onChangeText={(v) => onChange('username', v)} label="Username" placeholder="example@gmail.com" />
            <Input value={values.password} onChangeText={(v) => onChange('password', v)} label="Password" placeholder="*******" />

            <Button onPress={onSubmit} style={styles.button} title="Sign In"  />

            <Separator />

            <Text style={styles.footerText}>
                Don't have an account?
                <Text onPress={onSignUp} style={styles.footerLink}> Sign Up</Text>
            </Text>
        </ScrollView>
    )
}

export default React.memo(SignIn);