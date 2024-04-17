import React, {useContext} from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { products } from '../../../data/products';
import FavoriteItem from '../../../Component/FavoriteItem';
import Header from '../../../Component/Header';
import {ServicesContext} from "../../../App";

const Favorites = ({ navigation }) => {
    const { services, setServices } = useContext(ServicesContext);
    const renderItem = ({ item }) => {
        const onProductPress = () => {
            navigation.navigate('ProductDetails', { product: item })
        }
        return (
            <FavoriteItem onPress={onProductPress} {...item} />
        )
    }

    return (
        <SafeAreaView>
            <Header title="Favorites" />

            <FlatList data={products} renderItem={renderItem} keyExtractor={(item) => String(item?.id)} />
        </SafeAreaView>
    )
}

export default React.memo(Favorites);