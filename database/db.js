import * as SQLite from "expo-sqlite/legacy";
import { addTaskData, deleteTaskData, updateTaskData } from "../scripts/http";
import { useContext } from "react";
import { TaskContext } from "../store/task-context";
// import * as FileSystem from 'expo-file-system'

// const dbFilePath = `${FileSystem.documentDirectory}OfficeWork.db`;

const db = SQLite.openDatabase("OfficeWork.db");

export function CreateSQLiteTable() {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS tasks (id TEXT PRIMARY KEY, taskDetails TEXT, typeOfWork TEXT, status TEXT, selectedDate TEXT, signature TEXT, synced TEXT DEFAULT 'loaded', isDeleted INTEGER DEFAULT 0, notificationId TEXT)",
        [],
        (tx, resultSet) => {
          resolve(console.log("APP JS File Table Created SuccessFully"));
        },
        (tx, error) => {
          reject(console.log(error));
        }
      );
      // tx.executeSql("ALTER TABLE tasks ADD COLUMN notificationId Text");
      // tx.executeSql("DROP TABLE tasks",[])
    });
  });
}

export function UpdateSQLiteTable(taskData, syncStatus, notificationId, id) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE tasks SET taskDetails = ?, typeOfWork = ?, status = ?, selectedDate = ?, signature = ?, synced = ?, notificationId = ?  WHERE id = ?",
        [
          taskData.taskDetails,
          taskData.typeOfWork,
          taskData.status,
          taskData.selectedDate,
          taskData.signature,
          syncStatus,
          notificationId,
          id,
        ],
        (tx, resultSet) => {
          resolve(console.log(resultSet.rowsAffected));
        },
        (tx, error) => {
          reject(console.log(error));
        }
      );
    });
  });
}

export function AddDateToSQLiteTable(
  response,
  taskData,
  syncStatus,
  notificationId
) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO tasks (id, taskDetails, typeOfWork, status, selectedDate, signature, synced, notificationId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          response,
          taskData.taskDetails,
          taskData.typeOfWork,
          taskData.status,
          taskData.selectedDate,
          taskData.signature,
          syncStatus,
          notificationId,
        ],
        (tx, resultSet) => {
          resolve(console.log(resultSet.rowsAffected));
        },
        (tx, error) => {
          reject(console.log(error));
        }
      );
    });
  });
}

export function FetchDataFromSQLite() {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM tasks WHERE isDeleted = 0",
        [],
        (tx, resultSet) => {
          console.log(resultSet.rowsAffected);
          resolve(resultSet.rows._array);
        },
        (tx, error) => reject(console.log(error))
      );
    });
  });
}

export function syncPendingData() {
  console.log("Running");
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM tasks WHERE synced = 'pending' ",
        [],
        async (tx, resultSet) => {
          for (let i = 0; i < resultSet.rows.length; i++) {
            let task = resultSet.rows.item(i);
            console.log(task);
            if (task.isDeleted) {
              deleteTaskData(task.id);
              tx.executeSql("DELETE FROM tasks WHERE id = ?", [task.id]);
            } else {
              console.log("Syncing Data");
              const response = await addTaskData({
                taskDetails: task.taskDetails,
                typeOfWork: task.typeOfWork,
                status: task.status,
                selectedDate: task.selectedDate,
                signature: task.signature,
              });
              await new Promise((resolve, reject) => {
                db.transaction((tx) => {
                  tx.executeSql(
                    "UPDATE tasks SET synced = ?, id = ? WHERE id = ?",
                    ["loaded", response, task.id],
                    (tx, resultSet) => {
                      resolve(console.log(resultSet.rowsAffected));
                    }
                  );
                });
              });
            }
          }
        }
      );
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM tasks WHERE synced = 'updated'",
          [],
          async (tx, resultSet) => {
            for (let i = 0; i < resultSet.rows.length; i++) {
              let task = resultSet.rows.item(i);
              console.log(task);
              await updateTaskData(task.id, task);
              db.transaction((tx) => {
                tx.executeSql(
                  "UPDATE tasks SET synced = 'loaded' WHERE id = ?",
                  [task.id],
                  (tx, resultSet) =>
                    resolve(console.log(resultSet.rowsAffected))
                );
              });
            }
          }
        );
      });
    });
  });
}

export function DeleteDataFromSQLiteTable(id) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM tasks WHERE id = ?",
        [id],
        (tx, resultSet) => resolve(console.log(resultSet.rowsAffected)),
        (tx, error) => reject(console.log(error))
      );
    });
  });
}

export function DeleteOffline(id) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE tasks SET isDeleted = 1, synced = 'pending' WHERE id = ?",
        [id],
        (tx, resultSet) => {
          resolve(console.log(resultSet.rowsAffected));
        }
      );
    });
  });
}
