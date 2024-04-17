import React, {useContext} from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { products } from '../../../data/products';
import FavoriteItem from '../../../Component/FavoriteItem';
import Header from '../../../Component/Header';
import {ServicesContext} from "../../../App";

const MyListings = ({ navigation }) => {
    const { services, setServices } = useContext(ServicesContext);

    const renderItem = ({ item }) => {
        const onProductPress = () => {
            navigation.navigate('ProductDetails', { product: item })
        }
        return (
            <FavoriteItem icon={require('../../../assets/delete.png')} onPress={onProductPress} {...item} />
        )
    }

    const goBack = () => navigation.goBack()

    return (
        <SafeAreaView>
            <Header title="My Listings" showBack onBackPress={goBack} />

            <FlatList data={products} renderItem={renderItem} keyExtractor={(item) => String(item?.id)} />
        </SafeAreaView>
    )
}

export default React.memo(MyListings);
