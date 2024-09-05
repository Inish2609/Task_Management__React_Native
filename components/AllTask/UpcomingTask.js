import { FlatList, StyleSheet, Text, View } from "react-native";
import UpcomingTaskList from "./UpcomingTaskList";
import { useContext, useEffect } from "react";
import { TaskContext } from "../../store/task-context";
import { useTranslation } from "react-i18next";
import { FetchDataFromSQLite } from "../../database/db";


export default function UpcomingTask() {
  const taskCtx = useContext(TaskContext);
  const { t } = useTranslation();
  useEffect(() => {
    async function getTaskData() {
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
