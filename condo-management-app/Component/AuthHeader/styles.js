import {StyleSheet} from "react-native";
import {colors} from "../../utils/colors";

export const styles = StyleSheet.create(({
    container: {
        flexDirection: "row",
        alignItems: "center"
    },
    image: {
        width: 18,
        height: 18
    },
    title: {
        color: colors.olive,
        fontSize: 26,
        fontWeight: '500',
        paddingHorizontal: 16,
    }
}))