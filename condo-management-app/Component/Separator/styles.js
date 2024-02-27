import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    line: {
        height: 1,
        backgroundColor: colors.white,
        flex: 1,
    },
    text: {
        color: colors.olive,
        fontWeight: '500',
        marginHorizontal: 8,
    }
})