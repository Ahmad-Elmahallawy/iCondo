import React, {useState} from 'react'
import {ScrollView, View, Text} from 'react-native'
import {styles} from "./styles";
import Button from "../../../Component/Button/index"
import AuthHeader from "../../../Component/AuthHeader";
import Input from "../../../Component/Input";
import Checkbox from "../../../Component/Checkbox";
import Separator from "../../../Component/Separator";
const SignUpAsAdmin = ({navigation}) => {
    const [checked, setChecked] = useState(false);
    const onSignIn = () => {
        navigation.navigate('SignIn')
    }
    const onBack = () => {
        navigation.goBack()
    }
    return (
        <ScrollView style={styles.container}>
            <AuthHeader onBackPress={onBack} title="Sign Up" />

            <Input label="Name" placeholder="John Doe" />
            <Input label="E-mail" placeholder="example@gmail.com" />
            <Input isPassword label="Password" placeholder="*******" />

            <Separator/>
            <Button style={styles.button} title="Sign Up"  />
            <Separator/>
            <Text style={styles.footerText}>
                Already have an account?
                <Text onPress={onSignIn} style={styles.footerLink}> Sign In</Text>
            </Text>
        </ScrollView>
    )
}

export default React.memo(SignUpAsAdmin);