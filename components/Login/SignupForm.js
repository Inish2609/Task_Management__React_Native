import { StyleSheet, View, Pressable, Text } from "react-native"
import FormInputField from "../UI/FormInputField"
import Button from "../UI/Button"
import { useNavigation } from "@react-navigation/native"
import i18next from '../../scripts/language'
import { useTranslation } from "react-i18next"


export default function SignupForm(){

    const navigation = useNavigation()
    const {t} = useTranslation()

    function navigationLoginPageHandler(){
        navigation.navigate("LoginScreen")
    }

    return(
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <FormInputField name="user" placeholder="Username"/>
                <View style={{flex:1, marginTop:-40}}>
                    <FormInputField name="mail" placeholder="Email" />
                </View>
                <View style={{flex:1, marginTop:-20}}>
                    <FormInputField name='lock' placeholder="Password" isPassword={true} />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button onPress={()=> navigation.navigate("AllTaskPage")} >Signup</Button>
                <Pressable style={({pressed})=>pressed && styles.pressed} onPress={navigationLoginPageHandler} >
                    <View>
                        <Text>{t("Already Have an Account")}</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    buttonContainer:{
        flex:1,
        alignItems:"center"
    },
    formContainer:{
        flex:1,
    },
    pressed:{
        opacity:0.75,
    }
})