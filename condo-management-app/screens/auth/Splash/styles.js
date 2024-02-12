import {StyleSheet} from "react-native";
import {colors} from "../../../utils/colors";

export const styles = StyleSheet.create({
    image: {
        width: 350,
        height: 300,
    },
    titleContainer: {
      marginVertical: 50,
    },
    title: {
        paddingTop: 50,
        fontSize: 30,
        textAlign: 'center'
    },
    innerTitle: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.olive,
    },
    container: {
        padding: 24,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        height: '100%'
    },
    footerTyper:{
        color: colors.darkBlack,
        textAlign:'center',
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 30
    }
})