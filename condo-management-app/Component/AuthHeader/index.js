import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import {Pressable, Touchable, TouchableOpacity, Text, View} from "react-native";
import {styles} from "./styles";
const AuthHeader = ({title, onBackPress}) => {
    return (
        <View style={styles.container}>
        <Pressable hitSlop={20} onPress={onBackPress}>
            <Icon name="arrow-back-outline" size={16} color="#000" />
        </Pressable>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}
export default AuthHeader