import React, {useState} from 'react'
import {ScrollView, View, Text} from 'react-native'
import {styles} from "./styles";
import Button from "../../../Component/Button/index"
import AuthHeader from "../../../Component/AuthHeader";
import Input from "../../../Component/Input";
import Checkbox from "../../../Component/Checkbox";
import Separator from "../../../Component/Separator";
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUp = ({ navigation }) => {
    const [checked, setChecked] = useState(false);

    const onSignIn = () => {
        navigation.navigate('SignIn')
    }
    const onSignUpAsAdmin = () => {
        navigation.navigate('SignUpAsAdmin')
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

            <View style={styles.agreeRow}>
                <Checkbox checked={checked} onCheck={setChecked} />
                <Text style={styles.agreeText}>I agree with <Text style={styles.agreeTextBold}>Terms</Text> & <Text style={styles.agreeTextBold}>Privacy</Text></Text>
            </View>

            <Button style={styles.button} title="Sign Up"  />

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