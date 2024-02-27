import React, { useState } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../Component/Header';
import * as ImagePicker from 'expo-image-picker';
import Input from '../../../Component/Input';
import Button from '../../../Component/Button';
import { categories } from '../../../data/categories';
import Separator from "../../../Component/Separator";

const CreateListing = ({ navigation }) => {
    const [images, setImages] = useState([]);
    const [values, setValues] = useState({});
    const [loading, setLoading] = useState(false);

    const goBack = () => {
        navigation.goBack();
    }

    const uploadNewImage = async () => {
        setLoading(true);
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            })
            if (result?.assets?.length) {
                setImages(list => ([...list, ...result?.assets]));
                setLoading(false);
            }
        } catch (error) {
            console.error('Error selecting image:', error);
            setLoading(false);
        }
    }

    const onDeleteImage = (image) => {
        setImages((list) => {
            const filteredImages = list.filter(img => img?.fileName !== image?.fileName);
            return filteredImages;
        });
    }

    const onChange = (value, key) => {
        setValues((val) => ({ ...val, [key]: value }));
    }

    return (
        <SafeAreaView>
            <Header showBack={true} onBackPress={goBack} title="Create a new listing" />

            <ScrollView style={styles.container}>
                <KeyboardAvoidingView behavior='position'>
                    <Text style={styles.sectionTitle}>Upload Photos</Text>

                    <View style={styles.imageRow}>
                        <TouchableOpacity disabled={loading} style={styles.uploadContainer} onPress={uploadNewImage}>
                            <View style={styles.uploadCircle}>
                                <Text style={styles.uploadPlus}>+</Text>
                            </View>
                        </TouchableOpacity>

                        {images?.map(image => (
                            <View style={styles.imageCont} key={image?.fileName}>
                                <Image style={styles.image} source={{ uri: image?.uri }} />
                                <Pressable hitSlop={20} onPress={() => onDeleteImage(image)}>
                                    <Image style={styles.delete} source={require('../../../assets/close.png')} />
                                </Pressable>
                            </View>
                        ))}

                        {loading ? (
                            <ActivityIndicator />
                        ) : null}
                    </View>

                    <Input placeholder="Listing Title" label="Title" value={values.title} onChangeText={(v) => onChange(v, 'title')} />
                    <Input placeholder="Select the category" label="Category" value={values.category} onChangeText={(v) => onChange(v, 'category')} type="picker" options={categories} />
                    <Input placeholder="Enter price in USD" label="Price" value={values.price} onChangeText={(v) => onChange(v, 'price')} keyboardType="numeric" />
                    <Input style={styles.textarea} placeholder="Tell us more..." label="Description" value={values.description} onChangeText={(v) => onChange(v, 'description')} multiline />
                </KeyboardAvoidingView>

                <Button title="Submit" style={styles.button} />
                <Separator/>

            </ScrollView>
        </SafeAreaView>
    )
}

export default React.memo(CreateListing);