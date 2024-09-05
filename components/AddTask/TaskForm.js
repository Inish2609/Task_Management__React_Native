import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Button,
  KeyboardAvoidingView
} from "react-native";
import TaskFormField from "./TaskFormField";
// import Button from "../UI/Button";
import RNPickerSelect from "react-native-picker-select";
import { useContext, useState, useRef, useEffect } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TaskContext } from "../../store/task-context";
import { useNavigation } from "@react-navigation/native";
import { addTaskData, updateTaskData } from "../../scripts/http";
import { useTranslation } from "react-i18next";
import Signature from "react-native-signature-canvas";
import * as FileSystem from "expo-file-system";
// import * as SQLite from "expo-sqlite/legacy";
import NetInfo from "@react-native-community/netinfo";
import { AddDateToSQLiteTable, UpdateSQLiteTable } from "../../database/db";
import {
  cancelNotification,
  scheduleNotification,
} from "../../notifications/triggerNotification";
import { alert } from "../UI/alert";

export default function TaskForm(props) {
  const ref = useRef();
  const { t } = useTranslation();
  const [taskDetails, setTaskDetails] = useState(
    props.data ? props.data.taskDetails : ""
  );
  const [typeOfWork, setTypeOfWork] = useState(
    props.data ? props.data.typeOfWork : ""
  );
  const [status, setStatus] = useState(props.data ? props.data.status : "");
  const [selectedDate, setSelectedDate] = useState(
    props.data ? props.data.selectedDate : ""
  );

  const [signature, SetSignature] = useState(
    props.data ? props.data.signature : ""
  );

  const [netInfoStatus, setNetInfoStatus] = useState(true);

  const [notificationIdentifier, setNoticationIdentifier] = useState(
    props.data ? props.data.notificationId : ""
  );


  const navigation = useNavigation();
  const taskCtx = useContext(TaskContext);

  function taskDetailHandler(value) {
    setTaskDetails(value);
  }

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        setNetInfoStatus(true);
      } else {
        setNetInfoStatus(false);
      }
    });

    return () => unsubscribe();
  }, [netInfoStatus]);

  const saveSignature = (base64String) => {
    const filename = `${FileSystem.documentDirectory}signature.png`;
    const base64Data = base64String.replace("data:image/png;base64,", "");
    try {
      FileSystem.writeAsStringAsync(filename, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });
      submitValueHandler(filename);
      return filename;
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  async function updateValue() {
    await cancelNotification(notificationIdentifier);
    const notificationId = await scheduleNotification(
      selectedDate,
      taskDetails
    );

    const taskData = {
      taskDetails: taskDetails,
      typeOfWork: typeOfWork,
      status: status,
      selectedDate: selectedDate,
      signature: signature,
      notificationId:notificationId
    };

    console.log("Hello Edit");

    if (netInfoStatus) {
      updateTaskData(props.data.id, taskData);
      console.log("Hello Update");
      taskCtx.updateTask(props.data.id, taskData);
      await UpdateSQLiteTable(
        taskData,
        "loaded",
        notificationId,
        props.data.id
      );
    } else {
      UpdateSQLiteTable(taskData, "updated", notificationId, props.data.id);
      taskCtx.updateTask(props.data.id, taskData);
    }

    console.log(taskData);

    setSelectedDate("");
    setStatus("");
    setTaskDetails("");
    setTypeOfWork("");
    SetSignature("");

    navigation.goBack();
  }

  async function submitValueHandler(data) {
    const notificationId = await scheduleNotification(
      selectedDate,
      taskDetails
    );

    const taskData = {
      taskDetails: taskDetails,
      typeOfWork: typeOfWork,
      status: status,
      selectedDate: selectedDate,
      signature: data,
      notificationId: notificationId,
    };
    if (netInfoStatus) {
      const response = await addTaskData(taskData);
      console.log(typeof response);
      taskCtx.addTask(taskData, response);
      await AddDateToSQLiteTable(response, taskData, "loaded", notificationId);
    } else {
      console.log("Offline");
      const rnd = Math.random().toString();
      await AddDateToSQLiteTable(rnd, taskData, "pending", notificationId);
      taskCtx.addTask(taskData, rnd);
    }
    console.log(taskData);

    setSelectedDate("");
    setStatus("");
    setTaskDetails("");
    setTypeOfWork("");
    SetSignature("");

    navigation.goBack();
  }

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formattedDate = date.toString();
    setSelectedDate(formattedDate);
    hideDatePicker();
  };

  async function handleOK(data) {
    const dataSign = await saveSignature(data);
  }

  function handleClear() {
    ref.current.clearSignature();
  }

  function handleConfirmValue() {
    ref.current.readSignature();
  }

  return (
    <View style={styles.container}>
      <TaskFormField
        label="Task Details"
        placeholder="Enter The Task Details"
        taskDetails={taskDetails}
        taskDetailHandler={taskDetailHandler}
      />
      <View style={styles.workContainer}>
        <Text style={styles.label}>{t("Select an TypeOfWork")}</Text>
        <RNPickerSelect
          onValueChange={(value) => setTypeOfWork(value)}
          items={[
            { label: "Personal", value: "Personal" },
            { label: "Office", value: "Office" },
            { label: "Other", value: "Other" },
          ]}
          value={typeOfWork}
        />
      </View>
      <View style={styles.workContainer}>
        <Text style={styles.label}>{t("Choose The Date To Complete")}</Text>
        <TouchableOpacity onPress={showDatePicker} style={{ marginTop: 10 }}>
          <View pointerEvents="none">
            <TextInput
              style={styles.input}
              placeholder={t("Select Date")}
              value={selectedDate}
              editable={false}
            />
          </View>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      <View style={styles.workContainer}>
        <Text style={styles.label}>{t("Select an Status")}</Text>
        <RNPickerSelect
          onValueChange={(value) => setStatus(value)}
          value={status}
          items={[
            { label: "Done", value: "Done" },
            { label: "In Progress", value: "In Progress" },
            { label: "Pending", value: "Pending" },
          ]}
        />
      </View>
      <View></View>
      <View style={styles.buttonContainer}>
        {!signature && (
          <Signature
            ref={ref}
            onOK={handleOK}
            onEmpty={() => console.log("Empty")}
            descriptionText="Sign"
            clearText="Clear"
            confirmText="Save"
            webStyle={`.m-signature-pad--footer {display: block; margin: 0px;}`}
            autoClear={true}
          />
        )}
        {signature && (
          <View>
            <Image
              source={{ uri: signature }}
              style={{
                width: 100,
                height: 100,
                alignItems: "center",
                justifyContent: "center",
              }}
            />
            <View>
              <Button
                title={props.isEdited ? t("Update") : t("Add")}
                onPress={alert.bind(this,updateValue)}
              />
            </View>
          </View>
        )}
        {!signature && (
          <View style={styles.buttons}>
            <View style={{ margin: 10 }}>
              <Button
                title={props.isEdited ? t("Update") : t("Add")}
                onPress={alert.bind(this,handleConfirmValue)}
              />
            </View>
            <View style={{ margin: 10 }}>
              <Button title="Clear" onPress={handleClear} />
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
  },
  buttons: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  workContainer: {
    // flexDirection:'row',
    flex: 1,
    alignItems: "center",
    // padding: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "serif",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "lightgreen",
  },
});
