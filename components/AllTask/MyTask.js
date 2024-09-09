import { Button, StyleSheet, View, Text, FlatList } from "react-native";
import MyTaskList from "./MyTaskList";
import { TaskContext } from "../../store/task-context";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NetInfo from "@react-native-community/netinfo";
import { FetchDataFromSQLite, syncPendingData } from "../../database/db";

export default function MyTask() {
  const taskCtx = useContext(TaskContext);
  const [filteredTasks, setFilteredTasks] = useState();
  const [netInfo, setNetInfo] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    async function getTaskData() {
      const task = await FetchDataFromSQLite()
      taskCtx.setTask(task)
    }
    
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        console.log(state.isConnected);
        setNetInfo(true);   
        getTaskData(); 
      } else {
        setNetInfo(false);
        getTaskData() 
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setFilteredTasks(taskCtx.tasks);
  }, [taskCtx.tasks]);

  function filterTask(identifier) {
    let tasksToShow;

    if (identifier === "In Progress") {
      tasksToShow = taskCtx.tasks.filter(
        (task) => task.status === "In Progress"
      );
    } else if (identifier === "Pending") {
      tasksToShow = taskCtx.tasks.filter((task) => task.status === "Pending");
    } else if (identifier === "Done") {
      tasksToShow = taskCtx.tasks.filter((task) => task.status === "Done");
    } else {
      tasksToShow = taskCtx.tasks;
    }

    setFilteredTasks(tasksToShow);
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t("MyTask List")}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button onPress={filterTask.bind(this, "All")} title={t("All")} />
        </View>
        <View style={{ flex: 1.5, marginHorizontal: 2 }}>
          <Button
            onPress={filterTask.bind(this, "Pending")}
            title={t("Pending")}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Button
            onPress={filterTask.bind(this, "In Progress")}
            title={t("In Progress")}
          />
        </View>
        <View style={styles.button}>
          <Button onPress={filterTask.bind(this, "Done")} title={t("Done")} />
        </View>
      </View>
      <View>
        <FlatList
          data={filteredTasks}
          renderItem={(itemData) => {
            return <MyTaskList itemData={itemData} />;
          }}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: -30,
    // paddingTop:30
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 2,
  },
  titleContainer: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "serif",
  },
});
