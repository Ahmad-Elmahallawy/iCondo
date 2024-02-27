import React, { useState } from 'react';
import { Image, Linking, Pressable, ScrollView, Text, View } from 'react-native';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../Component/Header';
import ListItem from '../../../Component/ListCondo';
import EditableBox from '../../../Component/EditableBox';
import Button from '../../../Component/Button';
import Input from "../../../Component/Input";
import Separator from "../../../Component/Separator";

const Settings = ({ navigation }) => {
    const [editing, setEditing] = useState(false);
    const [values, setValues] = useState({firstName: 'Joe',lastName: 'Doe',
        phoneNumber: '111-111-111',password: '******', email: 'user@mail.com'})

    const onEditPress = () => {
        setEditing(true);
    }

    const onSave = () => {
        setEditing(false);
    }

    const onChange = (key, value) => {
        setValues(v => ({...v, [key]: value}))
    }

    const onItemPress = () => {
        Linking.openURL('https://google.com');
    }

    const goBack = () => {
        navigation.goBack()
    }

    return (
        <SafeAreaView>
            <Header showBack onBackPress={goBack} title="Settings" />
            <ScrollView style={styles.container}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Personal Information</Text>
                    <Pressable onPress={onEditPress}>
                        <Image style={styles.icon} source={require('../../../assets/edit.png')} />
                    </Pressable>
                </View>
                <EditableBox label="First Name" onChangeText={(v) => onChange('firstName', v)} value={values.firstName} editable={editing} />
                <EditableBox label="Last Name" onChangeText={(v) => onChange('lastName', v)} value={values.lastName} editable={editing} />
                <EditableBox label="Email" onChangeText={(v) => onChange('email', v)} value={values.email} editable={editing} />
                <EditableBox label="Phone Number" onChangeText={(v) => onChange('phoneNumber', v)} value={values.phoneNumber} editable={editing} />
                <EditableBox label="Password" onChangeText={(v) => onChange('password', v)} value={values.password} editable={editing} />

                {editing ? (
                    <Button style={styles.button} onPress={onSave} title="Save" />
                ) : null}
                <Text style={[styles.sectionTitle, {marginTop: 40}]}>Submit Registration Key</Text>
                <Input placeholder="Registration Key" label="Registration Key" value={values.registrationKey} onChangeText={(v) => onChange(v, 'registrationKey')} />
                <Button title="Submit" style={styles.button} />

                <Text style={[styles.sectionTitle, {marginTop: 40}]}>Help Center</Text>
                <ListItem onPress={onItemPress} style={styles.item} title="FAQ" />
                <ListItem onPress={onItemPress} style={styles.item} title="Contact Us" />
                <ListItem onPress={onItemPress} style={styles.item} title="Privacy & Terms" />
                <Separator/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default React.memo(Settings);