import { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import i18next from '../../scripts/language'
import { useTranslation } from "react-i18next";
import { TaskContext } from "../../store/task-context";


export default function Header(){

    const {t} = useTranslation()
    const [wishes,setWishes] = useState('')
    const [count,setCount] = useState(0)
    const taskCtx = useContext(TaskContext)

    useEffect(()=>{
        const now = new Date()
        const hrs = now.getHours()
        if(hrs < 12 && hrs > 5){
            setWishes("Good Morning")
        }
        else if(hrs >= 12 && hrs <= 16){
            setWishes("Good Afternoon")
        }
        else {
            setWishes("Good Evening")
        }
    },[])

    useEffect(() => {
        // console.log("hello")
        setCount(taskCtx.tasks.filter(task => (task.status === 'Pending')).length)
    },[taskCtx.tasks])

    return(
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/Images/3d-cartoon-cute-boy-photo.jpg")} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{t(wishes)}!, Inish</Text>
                <Text style={{textAlign:'center'}}>{t("Task Remaining")} : {count}</Text>
            </View>
            <View style={styles.iconContainer}>
                <FontAwesome name="bell" size={28} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding:20,
        // flex:1,
        paddingTop:30,
        flexDirection:'row'
    },
    imageContainer: {
        width: 80, 
        height: 80, 
        overflow: 'hidden', 
        borderRadius: 40, 
    },
    image: {
        width: '100%',
        height: '100%',
    },
    textContainer:{
        padding:15,
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
    },
    iconContainer:{
        padding:15,
    }
})