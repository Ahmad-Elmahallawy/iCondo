import { StyleSheet } from "react-native";
import { colors } from "../../../utils/colors";

export const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
    agreeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    agreeText: {
        color: colors.grey,
        marginHorizontal: 13,
    },
    agreeTextBold: {
        fontWeight: 'bold',
    },
    button: {
        marginVertical: 20,
    },
    footerText: {
        color: colors.grey,
        marginBottom: 56,
        textAlign: 'center'
    },
    footerLink: {
        fontWeight: 'bold',
    }
})