import { StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";


export default function UpcomingTaskList(props){
    const {t} = useTranslation()
    return(
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={{paddingVertical:8}}>{t("Task")}: {props.itemData.item.id}</Text>
                <Text style={{marginTop:4}}>{props.itemData.item.taskDetails}</Text>
                <Text style={{marginTop:4}}>{props.itemData.item.status}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        // width:200,
        // height:120,
        flex:1,
        elevation:4,
        padding:18,
        borderRadius:10,
        backgroundColor:'white',
        margin:8,
    },
    contentContainer:{
        overflow:'hidden'
    }
})