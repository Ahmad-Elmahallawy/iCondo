import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

const { width } = Dimensions.get('window')

export const styles = StyleSheet.create({
    container: {
        margin: 8,
    },
    title: {
        color: colors.darkBlack,
        fontWeight: 'bold',
        paddingVertical: 8,
    },
    image: {
        width: (width - 64) / 2,
        height: 220,
        borderRadius: 8,
    },
    price: {
        color: colors.darkBlack,
        paddingBottom: 8,
    }
})