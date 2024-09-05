import { ScrollView, StyleSheet, View } from "react-native";
import Header from "../components/AllTask/Header";
import TaskContent from "../components/AllTask/TaskContent";
import MyTask from "../components/AllTask/MyTask";
import { useEffect } from "react";
import { syncPendingData } from "../database/db";
import NetInfo from '@react-native-community/netinfo'

export default function AllTaskScreen(){

    useEffect(() => {
        console.log("Inish All Task Screen")
        async function sync(){
            await syncPendingData()
        }
        const unsubscribe = NetInfo.addEventListener(state => {
            if(state.isConnected){
                sync()
            }
        })

        return () => unsubscribe()
    },[])

    return(
        <View style={styles.container}>
            <Header />
            <View style={{flex:1,backgroundColor:'white',borderRadius:20}}>
                <TaskContent />
                <MyTask />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'lightgreen'
    }
})