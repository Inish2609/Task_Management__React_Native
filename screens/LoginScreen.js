import { Image, StyleSheet, Text, View } from "react-native";
import LoginForm from "../components/Login/LoginForm";
import i18next from '../scripts/language'
import { useTranslation } from "react-i18next";


export default function LoginScreen(){
    const {t} = useTranslation()
    return (
        <View style={styles.container}>
            <Image source={require('../assets/Images/Colorlib-Reg-Form-v7.jpg')} style={styles.image}/>
            <View >
                <Text style={styles.text}>{t("Hello")},{"\n"} {t("Welcome Back Again")}</Text>
            </View>
            <View style={styles.formContainer}>
                <LoginForm />
            </View>
        </View>
    )
}

const styles =StyleSheet.create({
    container:{
        flex:1,
    },
    image:{
        width:430,
        height:400,
    },
    text:{
        fontSize:30,
        fontWeight:'bold',
        fontFamily:'serif',
    },
    formContainer:{
        flex:1,
    }
})