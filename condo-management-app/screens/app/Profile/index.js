import React, {useContext} from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../Component/Header';
import ListItem from '../../../Component/ListCondo';
import Button from '../../../Component/Button';
import {ProfileContext, UserContext} from "../../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ navigation }) => {
    const num = 10;
    const { profile, setProfile } = useContext(ProfileContext);
    const { setUser } = useContext(UserContext);

    const onLogout = async () => {
        try {
            setUser(null);
        } catch (e) {
            console.error('Error while logging out:', e);
        }
    }

    const onSettingsPress = () => {
        navigation.navigate('Settings');
    }

    const onMyListingsPress = () => {
        navigation.navigate('MyListings');
    }

    const onNewListingPress = () => {
        navigation.navigate('CreateListing');
    }

    return (
        <SafeAreaView style={{ flex:1 }}>
            <Header title="Profile" showLogout onLogout={onLogout} />
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.name}>User name</Text>
                    <Text style={styles.email}>JoeDoe@gmail.com</Text>

                    <ListItem onPress={onMyListingsPress} title="My Listings" subtitle={`You have ${num} listings`} />
                    <ListItem onPress={onSettingsPress} title="Settings" subtitle="Account, FAQ, Contact" />
                </View>

                <Button onPress={onNewListingPress} style={{ flex: 0 }} title="Add New Listing" />
            </View>
        </SafeAreaView>
    )
}

export default React.memo(Profile);