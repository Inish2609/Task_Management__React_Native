import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Button from "../components/UI/Button";
import { FlatList } from "react-native-gesture-handler";
import i18next, { languageResources } from "../scripts/language";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function StartScreen(props){

    const [modelIsVisble,setModelIsVisble] = useState(false)

    function navigationHandler(){
        props.navigation.navigate("LoginPage")
    }

    function changelng(lng){
        i18next.changeLanguage(lng)
        setModelIsVisble(false)
    }

    const {t} = useTranslation()

    return(
        <View style={styles.container}>
            <Modal visible={modelIsVisble} transparent={true} animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <FlatList 
                            data={Object.keys(languageResources)} 
                            renderItem={(itemData) => {
                                return (
                                    <Pressable onPress={changelng.bind(this, itemData.item)} style={styles.listItem}>
                                        <Text style={styles.listText}>{itemData.item}</Text>
                                    </Pressable>
                                );
                            }}
                        />
                    </View>
                </View>
            </Modal>
            <Image source={require('../assets/Images/automated-task-management.png')} style={styles.imgae} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{t("A Task Manager You Can Trust")}!</Text>
                <Text style={styles.text}>{t("A workspace over 10 Million influencers around the world")}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button onPress={()=>setModelIsVisble(true)}>{t("Choose Language")}</Button>
                <Button onPress={navigationHandler}>Get Started</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imgae: {
        width: 450,
        height: 400,
        marginBottom: 20,
    },
    textContainer: {
        marginVertical: 10,
        justifyContent: 'center',
        textAlign: 'center',
    },
    title: {
        padding: 20,
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: "serif",
    },
    text: {
        padding: 15,
        textAlign: 'center',
        fontSize: 18,
    },
    buttonContainer: {
        flex:1,
        alignItems: 'center',
        // marginTop: 10,
        // justifyContent:"center"
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    listItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    listText: {
        fontSize: 18,
    },
});

