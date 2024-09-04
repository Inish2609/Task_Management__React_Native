import { Pressable, View, Text, StyleSheet } from "react-native";
import i18next from '../../scripts/language'
import { useTranslation } from "react-i18next";


export default function Button(props){
    const {t} = useTranslation()
    return(
        <View style={styles.container}>
            <Pressable android_ripple={'white'} style={({pressed})=> pressed && styles.pressed} onPress={props.onPress}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{t(props.children)}</Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'90%',
        height:'30%',
    },
    textContainer:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'green',
        padding:10,
        borderRadius:10,
        // flex:1
    },
    text:{
        fontSize:16,
        textAlign:'center',
        color:'white',
    },
    pressed:{
        opacity:0.75,
    }
})