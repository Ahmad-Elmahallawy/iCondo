import {StyleSheet} from "react-native";
import {colors} from "../../utils/colors";

export const styles = StyleSheet.create({
    container: {

    },
    label: {
        marginVertical: 8,
        color: colors.olive,
        fontSize: 14,
        fontWeight: "500"
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: colors.grey,
        borderRadius: 14
    },
    input: {
        borderWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 20,
        borderColor: 'yellow'
    }
})