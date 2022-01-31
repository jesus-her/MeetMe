import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { COLORS, SIZES } from "../constants";
import SignInScreen from "../screens/SignInScreen";
import CustomDrawer from "./CustomDrawer";
import PlayScreen from "../screens/PlayScreen";
import Picker from "../Picker/Picker";
import MyQuiz from "../screens/MyQuiz";
import CreateQuizScreen from "../screens/CreateQuizScreen";
import MyQuizScreen from "../screens/MyQuizScreen";
import FindQuizScreen from "../screens/FindQuizScreen";
import PlayQuizScreen from "../screens/PlayQuizScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import EditProfileScreen from "../screens/EditProfileScreen";
import CustomTab from "./CustomTab";
import ByQuizId from "../screens/ByQuizId";

const Stack = createStackNavigator();

export default function CustomStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerStyle: {
          backgroundColor: COLORS.primary,
          height: SIZES.heightNav,
        },
      }}
    >
      {/* <Stack.Screen name="BottomTab" component={CustomTab} />*/}
      <Stack.Screen
        name="Drawer"
        component={CustomDrawer}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FindQuiz"
        component={FindQuizScreen}
        options={{
          title: "",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="PlayQuiz"
        component={PlayQuizScreen}
        options={{
          title: "@titleQuiz",
          headerShown: false,
          headerTransparent: false,
        }}
      />

      <Stack.Screen
        name="Play"
        component={PlayScreen}
        options={{
          title: "@Username Quiz",
          headerShown: false,
          headerTransparent: false,
        }}
      />
      <Stack.Screen
        name="CreateQuiz"
        component={CreateQuizScreen}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyQuizScreen"
        component={MyQuizScreen}
        options={{
          title: "",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Picker"
        component={Picker}
        options={{
          title: "Social",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
