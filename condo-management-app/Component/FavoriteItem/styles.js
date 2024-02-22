import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
    container: {
        marginHorizontal: 24,
        paddingVertical: 16,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.olive,
    },
    title: {
        color: colors.grey,
        paddingVertical: 8,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 20,
    },
    price: {
        color: colors.darkBlack,
        paddingBottom: 8,
    },
    icon: {
        width: 24,
        height: 24,
        marginLeft: 8,
    },
    content: {
        flex: 1,
    }
})