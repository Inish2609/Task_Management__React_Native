import { StyleSheet, Text, View } from "react-native";
import IconButton from "../UI/IconButton";
import UpcomingTask from "./UpcomingTask";
import { useNavigation } from "@react-navigation/native";
import i18next from '../../scripts/language'
import { useTranslation } from "react-i18next";


export default function TaskContent(){
    const navigation = useNavigation()
    const {t} = useTranslation()
    return(
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{t("Today Task Summary")}</Text>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{t("Progress")}: <Text style={styles.insideTile}>85%</Text></Text>
                    <IconButton name="plus" size={24} onPress={()=> navigation.navigate("AddTaskScreen")} />
                </View>
            </View>
            <UpcomingTask />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'white',
        borderTopLeftRadius:35,
        borderTopRightRadius:35
    },

    contentContainer:{
        backgroundColor: "#CCFFCC",
        padding:20,
        margin:20,
        borderRadius:20,
    },
    textContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:10,   
    },
    title:{
        fontSize:16
    },
    insideTile:{
        fontSize:20,
        fontWeight:'bold'
    }
})