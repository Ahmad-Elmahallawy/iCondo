import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../Component/Header';
import ListItem from '../../../Component/ListCondo';
import Button from '../../../Component/Button';

const Profile = ({ navigation }) => {
    const num = 10;

    const onLogout = () => {
        console.log('log out clicked');
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