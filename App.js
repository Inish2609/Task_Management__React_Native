import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "./screens/StartScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import AllTaskScreen from "./screens/AllTaskScreen";
import AddTaskScreen from "./screens/AddTaskScreen";
import TaskContextProvider from "./store/task-context";
import ChartScreen from "./screens/ChartScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { CreateSQLiteTable } from "./database/db";
import * as Notifications from "expo-notifications";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tabs = createBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  useEffect(() => {
    CreateSQLiteTable();
    async function configureNotificationPermission() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert("Task Management App needs Notification permission");
      }

      return;
    }

    configureNotificationPermission();
  }, []);

  function DrawerNavigation() {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="LoginScreen" component={LoginScreen} />
        <Drawer.Screen name="SignupScreen" component={SignupScreen} />
      </Drawer.Navigator>
    );
  }

  function BottomTabsNavigation() {
    return (
      <Tabs.Navigator screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="AllTaskScreen"
          component={AllTaskScreen}
          options={{
            tabBarIcon: () => <FontAwesome name="bars" size={24} />,
          }}
        />
        <Tabs.Screen
          name="AddTaskScreen"
          component={AddTaskScreen}
          options={{
            tabBarIcon: () => <FontAwesome name="plus" size={24} />,
          }}
        />
        <Tabs.Screen
          name="ChartScreen"
          component={ChartScreen}
          options={{
            tabBarIcon: () => <FontAwesome name="bullseye" size={24} />,
          }}
        />
      </Tabs.Navigator>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <TaskContextProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="StartScreen" component={StartScreen} />
              <Stack.Screen name="LoginPage" component={DrawerNavigation} />
              <Stack.Screen
                name="AllTaskPage"
                component={BottomTabsNavigation}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </TaskContextProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
