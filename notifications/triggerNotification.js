import * as Notifications from "expo-notifications";

export async function scheduleNotification(dateTime, body) {
  console.log("Notification Added!!")
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Deadline Going To End Soon!!!!!!",
      body: body,
    },
    trigger: {
      date: new Date(dateTime),
    },
  });
  return notificationId
}


export async function cancelNotification(id){
    await Notifications.cancelScheduledNotificationAsync(id)
    console.log("Notification Cancelled!!")
}