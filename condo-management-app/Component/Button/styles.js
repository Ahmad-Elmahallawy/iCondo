import {StyleSheet} from "react-native";
import {colors} from "../../utils/colors";

export const styles = StyleSheet.create(({
    container: {
        backgroundColor: colors.darkBlack,
        paddingVertical: 20,
        paddingHorizontal: 8,
        borderRadius: 8,
        flex: 1,
    },
    title: {
        color: colors.white,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    }
}))