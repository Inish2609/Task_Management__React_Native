import { StyleSheet, View, Text } from "react-native";
import TaskForm from "./TaskForm";
import { useTranslation } from "react-i18next";

export default function AddTaskContent(props) {
  const { t } = useTranslation();

  // console.log(props.data)

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {props.isEdited ? t("Update the Task") : t("Add The Task")}
        </Text>
      </View>
      <View style={styles.formContainer}>
        <TaskForm data={props.data} isEdited={props.isEdited} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  textContainer: {
    padding: 20,
    elevation: 4,
    padding: 18,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "serif",
  },
  formContainer: {
    flex: 2,
  },
});
