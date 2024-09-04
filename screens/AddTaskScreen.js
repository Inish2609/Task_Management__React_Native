import { StyleSheet, View } from "react-native";
import Header from "../components/AllTask/Header";
import AddTaskContent from "../components/AddTask/AddTaskContent";
import { useContext } from "react";
import { TaskContext } from "../store/task-context";
import i18next from '../scripts/language'
import { useTranslation } from "react-i18next";

export default function AddTaskScreen(props){
    
    const editableId = props.route.params?.id

    // console.log(editableId)

    const isEdited = !!editableId
    const {t} = useTranslation()

    const taskCtx = useContext(TaskContext)

    if(isEdited){
        const editableData = taskCtx.tasks.find(task => task.id === editableId)
        return <AddTaskContent data={editableData} isEdited={isEdited} />
    }

    return(
        <View style={styles.container}>
            <Header/>
            <AddTaskContent />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"lightgreen",
        flex:1
    }
})