import { Button, StyleSheet, View, Text, FlatList } from "react-native";
// import { DUMMY_TASk } from "../../constants/data";
import MyTaskList from "./MyTaskList";
import { TaskContext } from "../../store/task-context";
import { useContext, useEffect, useState } from "react";
// import {
//   addTaskData,
//   deleteTaskData,
//   // fetchTaskData,
//   updateTaskData,
// } from "../../scripts/http";
// import i18next from "../../scripts/language";
import { useTranslation } from "react-i18next";
import NetInfo from "@react-native-community/netinfo";
import { FetchDataFromSQLite, syncPendingData } from "../../database/db";
// import * as SQLite from "expo-sqlite/legacy";

export default function MyTask() {
  const taskCtx = useContext(TaskContext);
  const [filteredTasks, setFilteredTasks] = useState();
  const [netInfo, setNetInfo] = useState(true);
  // const db = SQLite.openDatabase("OfficeWork");

  // console.log("Database path: ", db._dbFilename);

  const { t } = useTranslation();

  // function localDataFetchHandler() {
  //   // db.transaction((tx) => {
  //   //   tx.executeSql(
  //   //     "CREATE TABLE IF NOT EXISTS tasks (id TEXT PRIMARY KEY, taskDetails TEXT, typeOfWork TEXT, status TEXT, selectedDate TEXT, signature TEXT, synced TEXT DEFAULT 'loaded', isDeleted INTEGER DEFAULT 0)"
  //   //   );
  //   //   // tx.executeSql("DROP TABLE tasks",[])
  //   // });

  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       "SELECT * FROM tasks WHERE isDeleted = 0",
  //       [],
  //       (tx, resultSet) => {
  //         // ()=>console.log("Table Created successfully")
  //         console.log(resultSet);
  //         taskCtx.setTask(resultSet.rows._array);
  //       },
  //       (tx, error) => console.log(error)
  //     );
  //   });
  // }

  // function syncPendingTask() {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       "SELECT * FROM tasks WHERE synced = 'pending' ",
  //       [],
  //       async (tx, resultSet) => {
  //         for (let i = 0; i < resultSet.rows.length; i++) {
  //           let task = resultSet.rows.item(i);
  //           console.log(task);
  //           if (task.isDeleted) {
  //             deleteTaskData(task.id);
  //             tx.executeSql("DELETE FROM tasks WHERE id = ?", [task.id]);
  //           } else {
  //             console.log("Syncing Data");
  //             const response = await addTaskData({
  //               taskDetails: task.taskDetails,
  //               typeOfWork: task.typeOfWork,
  //               status: task.status,
  //               selectedDate: task.selectedDate,
  //               signature: task.signature,
  //             });
  //             db.transaction((tx) => {
  //               tx.executeSql(
  //                 "UPDATE tasks SET synced = ?, id = ? WHERE id = ?",
  //                 ["loaded", response, task.id],
  //                 (tx, resultSet) => console.log(resultSet.rowsAffected)
  //               );
  //             });
  //           }
  //         }
  //       }
  //     );
  //     db.transaction((tx) => {
  //       tx.executeSql(
  //         "SELECT * FROM tasks WHERE synced = 'updated'",
  //         [],
  //         async (tx, resultSet) => {
  //           for (let i = 0; i < resultSet.rows.length; i++) {
  //             let task = resultSet.rows.item(i);
  //             console.log(task);
  //             await updateTaskData(task.id, task);
  //             db.transaction((tx) => {
  //               tx.executeSql(
  //                 "UPDATE tasks SET synced = 'loaded' WHERE id = ?",
  //                 [task.id],
  //                 (tx, resultSet) => console.log(resultSet.rowsAffected)
  //               );
  //             });
  //           }
  //         }
  //       );
  //     });
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
    
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        console.log(state.isConnected);
        setNetInfo(true);
        // syncPendingTask();
        // syncPendingData()
        getTaskData(); 
        // localDataFetchHandler();
      } else {
        setNetInfo(false);
        // localDataFetchHandler();
        getTaskData() 
      }
    });

    return () => unsubscribe();
  }, [netInfo]);

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
    marginTop: -30,
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
