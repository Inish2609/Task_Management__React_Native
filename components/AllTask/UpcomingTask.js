import { FlatList, StyleSheet, Text, View } from "react-native";
import UpcomingTaskList from "./UpcomingTaskList";
import { useContext, useEffect } from "react";
import { TaskContext } from "../../store/task-context";
// import { fetchTaskData } from "../../scripts/http";
// import i18next from "../../scripts/language";
import { useTranslation } from "react-i18next";
import { FetchDataFromSQLite } from "../../database/db";
// import * as SQLite from "expo-sqlite/legacy";

export default function UpcomingTask() {
  const taskCtx = useContext(TaskContext);
  const { t } = useTranslation();
  // const db = SQLite.openDatabase("OfficeWork");

  // function localDataFetchHandler() {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       "CREATE TABLE IF NOT EXISTS tasks (id TEXT PRIMARY KEY, taskDetails TEXT, typeOfWork TEXT, status TEXT, selectedDate TEXT, signature TEXT, synced TEXT DEFAULT 'loaded', isDeleted INTEGER DEFAULT 0)"
  //     );
  //     // tx.executeSql("DROP TABLE tasks",[])
  //   });
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       "SELECT * FROM tasks WHERE isDeleted = 0",
  //       [],
  //       (tx, resultSet) => {
  //         console.log(resultSet);
  //         taskCtx.setTask(resultSet.rows._array);
  //       },
  //       (tx, error) => console.log(error)
  //     );
  //   });
  // }

  useEffect(() => {
    async function getTaskData() {
      // const taskData = await fetchTaskData()
      // taskCtx.setTask(taskData)
      // localDataFetchHandler();
      const task = await FetchDataFromSQLite()
      taskCtx.setTask(task)
    }
    getTaskData();
  }, []);

  const upcomingTask = taskCtx.tasks.filter((task) => {
    const now = new Date();
    const taskDate = new Date(task.selectedDate);
    return taskDate > now;
  });

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.tile}>{t("Upcoming Task")}</Text>
      </View>
      <View>
        <FlatList
          data={upcomingTask}
          renderItem={(itemData) => {
            return <UpcomingTaskList itemData={itemData} />;
          }}
          keyExtractor={(item) => item.id}
          horizontal={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    flex: 1,
  },
  titleContainer: {
    paddingHorizontal: 20,
  },
  tile: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "serif",
  },
  list: {
    flexDirection: "row",
  },
});
