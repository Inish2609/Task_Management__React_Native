import { StyleSheet, Text, View } from "react-native";
import IconButton from "../UI/IconButton";
import UpcomingTask from "./UpcomingTask";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../../store/task-context";


export default function TaskContent(){
    const navigation = useNavigation()
    const {t} = useTranslation()
    const taskCtx = useContext(TaskContext)
    const [inProgressPercentage , setInProgressPercentage] = useState(0) 

    function calculatePercentage(){
        const length = taskCtx.tasks.length
        if(length >  0){
            const inProgressitems = taskCtx.tasks.filter(task => task.status === 'In Progress').length
            const inprogressPercentage = (inProgressitems / length) * 100
            return inprogressPercentage
        }
        return 0
    }

    useEffect(() => {
        const inProgressPercentage = calculatePercentage()
        setInProgressPercentage(inProgressPercentage)
    },[taskCtx.tasks])


    return(
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{t("Today Task Summary")}</Text>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{t("Progress")}: <Text style={styles.insideTile}>{inProgressPercentage}%</Text></Text>
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