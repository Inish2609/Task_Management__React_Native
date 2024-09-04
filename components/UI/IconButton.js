import { Pressable, StyleSheet, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import i18next from '../../scripts/language'
import { useTranslation } from "react-i18next";

export default function IconButton(props){
    const {t} = useTranslation()
    return(
        <View style={style.container}>
            <Pressable style={({pressed})=>pressed && style.pressed} onPress={props.onPress} >
                <View style={style.iconContainer}>
                    <FontAwesome name={props.name} size={props.size} />
                </View>
            </Pressable>
        </View>
    )
}


const style = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer:{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressed:{
        opacity:0.75
    }
})