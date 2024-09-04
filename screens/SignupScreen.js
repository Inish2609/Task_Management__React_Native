import { StyleSheet, View, Image, Text } from "react-native";
import SignupForm from "../components/Login/SignupForm";
import i18next from '../scripts/language'
import { useTranslation } from "react-i18next";


export default function SignupScreen(){
    const {t} = useTranslation()
    return (
        <View style={styles.container}>
            <Image source={require('../assets/Images/Colorlib-Reg-Form-v7.jpg')} style={styles.image}/>
            <View >
                <Text style={styles.text}>{t("Create your Account")}</Text>
            </View>
            <View style={styles.container}>
                <SignupForm />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    image:{
        width:430,
        height:370,
    },
    text:{
        fontSize:30,
        fontWeight:'bold',
        fontFamily:'serif',
    },
})