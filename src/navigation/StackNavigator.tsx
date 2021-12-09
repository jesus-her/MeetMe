import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import PlayScreen from "../screens/PlayScreen";
import Picker from "../Picker/Picker";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PlayScreen"
        component={PlayScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Picker"
        component={Picker}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export { MainStackNavigator };
