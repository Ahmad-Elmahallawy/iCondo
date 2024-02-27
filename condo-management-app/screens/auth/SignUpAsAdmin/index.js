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
    const [values, setValues] = useState({})
    const onSignIn = () => {
        navigation.navigate('SignIn')
    }
    const onBack = () => {
        navigation.goBack()
    }
    return (
        <ScrollView style={styles.container}>
            <AuthHeader onBackPress={onBack} title="Sign Up" />
            <Input value={values.companyName} onChangeText={(v) => onChange('companyName', v)} label="Company Name" placeholder="ABC Inc" />
            <Input value={values.firstName} onChangeText={(v) => onChange('firstName', v)} label="First Name" placeholder="John" />
            <Input value={values.lastName} onChangeText={(v) => onChange('lastName', v)} label="Last Name" placeholder="Doe" />
            <Input value={values.userName} onChangeText={(v) => onChange('userName', v)} label="Username" placeholder="JohnDoe123" />
            <Input value={values.email} onChangeText={(v)=> onChange('email', v)} label="E-mail" placeholder="example@gmail.com" />
            <Input value={values.phoneNumber} onChangeText={(v)=> onChange('phoneNumber', v)} label="Phone number" placeholder="111-111-111" />
            <Input value={values.password} onChangeText={(v) => onChange('password', v)} isPassword label="Password" placeholder="*******" />
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