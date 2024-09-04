import { Alert } from "react-native";

export function alert(action) {
  Alert.alert("Warning", "Are You Sure ?", [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    { text: "OK", onPress: action },
  ]);
}
     