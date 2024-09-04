import { Pressable, StyleSheet, View, Text } from "react-native";
import FormInputField from "../UI/FormInputField";
import Button from "../UI/Button";
import { useNavigation } from "@react-navigation/native";
import i18next from '../../scripts/language'
import { useTranslation } from "react-i18next";


export default function LoginForm(){

    const navigation = useNavigation()
    const {t} = useTranslation()

    function navigationSignUpHandler(){
        navigation.navigate("SignupScreen")
    }

    function navigationAllTaskHandler(){
        navigation.navigate("AllTaskPage")
    }

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <FormInputField name="user" placeholder="Username"/>
                <View style={{flex:1, marginTop:-50}}>
                    <FormInputField name='lock' placeholder="Password" isPassword={true} />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button onPress={navigationAllTaskHandler}>Login</Button>
                <Pressable style={({pressed})=>pressed && styles.pressed} onPress={navigationSignUpHandler}>
                    <View>
                        <Text>{t("Create an Account")}</Text>
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