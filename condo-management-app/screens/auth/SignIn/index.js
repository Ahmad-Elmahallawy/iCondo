import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import AuthHeader from '../../../Component/AuthHeader';
import Button from '../../../Component/Button';
import Input from '../../../Component/Input';
import Separator from '../../../Component/Separator';
import { styles } from './styles';

const SignIn = ({navigation}) => {
    const onSignUp = () => {
        navigation.navigate('SignUp')
    }
    const onBack = () => {
        navigation.goBack()
    }
    return (
        <ScrollView style={styles.container}>
            <AuthHeader onBackPress={onBack} title="Sign In" />

            <Input label="E-mail" placeholder="example@gmail.com" />
            <Input isPassword label="Password" placeholder="*******" />

            <Button style={styles.button} title="Sign In"  />

            <Separator />

            <Text style={styles.footerText}>
                Don't have an account?
                <Text onPress={onSignUp} style={styles.footerLink}> Sign Up</Text>
            </Text>
        </ScrollView>
    )
}

export default React.memo(SignIn);