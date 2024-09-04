import { View, TextInput, Image, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import i18next from '../../scripts/language'
import { useTranslation } from 'react-i18next';


export default function FormInputField(props) {
  const {t} = useTranslation()
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <AntDesign name={props.name} style={styles.image} />
        <TextInput 
          style={styles.textInput} 
          placeholder={t(props.placeholder)}
          secureTextEntry={props.isPassword}
          value={props.value}
          onChangeText={props.onChangeText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin:15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '95%',
    backgroundColor:'lightgreen'
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    paddingVertical: 5,
  },
});
