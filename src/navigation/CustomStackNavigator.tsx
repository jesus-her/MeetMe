import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { COLORS, SIZES } from "../constants";
import CustomDrawer from "./CustomDrawer";
import PlayScreen from "../screens/PlayScreen";
import Picker from "../Picker/Picker";

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
          backgroundColor: COLORS.secondary,
          height: SIZES.heightNav,
        },
      }}
    >
      <Stack.Screen
        name="Drawer"
        component={CustomDrawer}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Play"
        component={PlayScreen}
        options={{
          title: "@Username Quiz",
          headerShown: true,
          headerTransparent: false,
        }}
      />
      <Stack.Screen
        name="Picker"
        component={Picker}
        options={{
          title: "Social",
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}
