import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "./CustomDrawerContent";
import HomeScreen from "../screens/HomeScreen";
import PlayScreen from "../screens/PlayScreen";
import Picker from "../Picker/Picker";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS } from "../constants";

const Drawer = createDrawerNavigator();

const CustomDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: COLORS.secondary,
        drawerActiveTintColor: COLORS.white,
        drawerLabelStyle: { marginLeft: -20, ...FONTS.h3 },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
          drawerType: "front",
        }}
      />
      <Drawer.Screen
        name="Play"
        component={PlayScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Ionicons name="play" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Picker"
        component={Picker}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Ionicons
              name="information-circle-outline"
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export { CustomDrawerNavigator };
