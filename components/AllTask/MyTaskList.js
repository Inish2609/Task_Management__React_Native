import { StyleSheet, Text, View } from "react-native";
import IconButton from "../UI/IconButton";
import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../../store/task-context";
import { useNavigation } from "@react-navigation/native";
import WebView from "react-native-webview";
import { deleteTaskData } from "../../scripts/http";
import { useTranslation } from "react-i18next";
import NetInfo from '@react-native-community/netinfo'
import { DeleteDataFromSQLiteTable, DeleteOffline } from "../../database/db";
import { cancelNotification } from "../../notifications/triggerNotification";
import { alert } from "../UI/alert";


export default function MyTaskList(props){

    const taskCtx = useContext(TaskContext);
    const navigation = useNavigation();
    const [netInfo , setNetInfo] = useState(true)

    async function deletehandler(id){

        await cancelNotification(props.itemData.item.notificationId)

        if(netInfo){
            console.log("deleting")
            taskCtx.deleteTask(id);
            deleteTaskData(id)
            DeleteDataFromSQLiteTable(id)
        }
        else{
            DeleteOffline(id)
            taskCtx.deleteTask(id)
        }
        
    }

    const {t} = useTranslation()

    useEffect(()=>{
        const unsubscribe = NetInfo.addEventListener(state =>{
            if(state.isConnected){
                setNetInfo(true)
            }
            else{
                setNetInfo(false)
            }
        })

        return () => unsubscribe()

    },[])

    function deleteAlert(){
        deletehandler(props.itemData.item.id)
    }

    const statusBar = `
        <div style="width: 100px; height: 100px; border-radius: 50px; background-color: ${
            props.itemData.item.status === 'Pending' ? 'red' : props.itemData.item.status === 'In Progress' ? 'yellow' : 'green'
        };"></div>
    `;



    return(
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={{paddingVertical:8}}>{t("Task")}: {props.itemData.item.id}</Text>
                <Text style={{marginTop:4}}>{props.itemData.item.taskDetails}</Text>
                <Text style={{marginTop:4}}>{props.itemData.item.status}</Text>
            </View>
            <View style={styles.statusContainer}>
                <WebView source={{ html: statusBar }} style={styles.webView} />
            </View>
            <View style={styles.iconContainer}>
                <IconButton name="edit" size={24} onPress={() => navigation.navigate("AddTaskScreen", { id: props.itemData.item.id })} />
                <IconButton name="trash" size={24} onPress={alert.bind(this,deleteAlert)} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // width: "100%",
        // height: 120,
        flex:1,
        elevation: 4,
        padding: 18,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 8,
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    contentContainer: {
        overflow: 'hidden',
        flex: 1,
    },
    statusContainer: {
        justifyContent: "center",
        // alignItems: 'center',
        width:50,
        height: 50,
        elevation: 4,
        padding: 11,
        borderRadius: 25,
        backgroundColor: 'white',
        margin: 8,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
