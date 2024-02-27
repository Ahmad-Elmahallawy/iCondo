import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import { Image, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

const Checkbox = ({ checked, onCheck }) => {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={() => onCheck(!checked)} style={styles.container}>
            {checked ? (
                <View style={styles.innerContainer}>
                    <Icon name="checksquare" size={12} color="#000" />
                </View>
            ) : null}
        </TouchableOpacity>
    )
}

export default React.memo(Checkbox);