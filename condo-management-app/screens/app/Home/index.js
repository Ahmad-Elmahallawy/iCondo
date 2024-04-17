import React, {useContext, useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../Component/Header';
import {categories} from '../../../data/categories';
import {products} from '../../../data/products';
import CategoryBox from '../../../Component/CategoryBox';
import ProductHomeItem from '../../../Component/ProductHomeItem';
import {ServicesContext} from "../../../App";
import {getCondoUnits} from "../../../utils/backendRequest";

const Home = ({navigation}) => {
    const [selectedCategory, setSelectedCategory] = useState();
    const [keyword, setKeyword] = useState();
    let [filteredProducts, setFilteredProducts] = useState(services);
    const {services, setServices} = useContext(ServicesContext);

    useEffect(() => {
        (async () => {
            let condoArray = [];
            const data = await getCondoUnits();
            for (let i = 0; i < data.length; i++) {
                condoArray.push({
                    id: i + 1,
                    title: data[i].unitNumber,
                    image: 'https://www.homz.io/wp-content/themes/gh/pub/auto/10406/xl-b50295c8-e057-4e1c-9601-61be84fa4113.jpg',
                    images: ['https://www.homz.io/wp-content/themes/gh/pub/auto/10406/xl-b50295c8-e057-4e1c-9601-61be84fa4113.jpg'],
                    category: i + 1,
                    price: data[i].condoFee,
                    description: 'Indulge in luxury living at Luxury Lakeside Residences, where sophistication meets tranquility. Perched beside a picturesque lake, our exquisite condominiums offer unparalleled elegance and breathtaking views. Immerse yourself in a world of refined amenities, including a private marina, infinity pool, and lush landscaped gardens. Experience the epitome of waterfront living at Luxury Lakeside Residences.'
                });
            }
            setServices(condoArray)
        })()
    }, [])

    useEffect(() => {
        if (selectedCategory && !keyword) {
            const updatedProducts = services.filter((product) => product?.category === selectedCategory);
            setFilteredProducts(updatedProducts);
        } else if (selectedCategory && keyword) {
            const updatedProducts = services.filter((product) => product?.category === selectedCategory && product?.title?.toLowerCase().includes(keyword?.toLowerCase()));
            setFilteredProducts(updatedProducts);
        } else if (!selectedCategory && keyword) {
            const updatedProducts = services.filter((product) => product?.title?.toLowerCase().includes(keyword?.toLowerCase()));
            setFilteredProducts(updatedProducts);
        } else if (!keyword && !selectedCategory) {
            setFilteredProducts(services);
        }
        setFilteredProducts = services;

    }, [selectedCategory, keyword, services])

    const renderCategoryItem = ({item, index}) => {
        return (
            <CategoryBox
                onPress={() => setSelectedCategory(item?.id)}
                isSelected={item?.id === selectedCategory}
                isFirst={index === 0}
                title={item?.title}
                image={item?.image}
            />
        )
    }

    const renderProductItem = ({item}) => {
        const onProductPress = (product) => {
            navigation.navigate('ProductDetails', {product})
        };
        return (
            <ProductHomeItem onPress={() => onProductPress(item)} {...item} />
        )
    }

    return (
        <SafeAreaView>
            <Header showSearch onSearch={setKeyword} keyword={keyword} title="Find All You Need"/>

            <FlatList
                showsHorizontalScrollIndicator={false}
                style={styles.list}
                horizontal
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item, index) => String(index)}
            />

            <FlatList
                style={styles.productsList}
                numColumns={2}
                data={filteredProducts}
                renderItem={renderProductItem}
                keyExtractor={(item) => String(item.id)}
                ListFooterComponent={<View style={{height: 200}}/>}
            />
        </SafeAreaView>
    )
}

export default React.memo(Home);