import { StyleSheet, Text, View } from "react-native";
import FormInputField from "../UI/FormInputField";
import i18next from '../../scripts/language'
import { useTranslation } from "react-i18next";


export default function TaskFormField(props){
    const {t} = useTranslation()
    return(
        <View style={styles.container}>
            <Text style={styles.label}>{t(props.label)}</Text>
            <FormInputField placeholder={props.placeholder} value={props.taskDetails} onChangeText={props.taskDetailHandler} />
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:10,
    },
    label:{
        fontSize:18,
        fontWeight:'bold',
        fontFamily:'serif'
    },
})