import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "./CustomDrawerContent";
import HomeScreen from "../screens/HomeScreen";
import PlayScreen from "../screens/PlayScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
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
          title: "MeetMe",
          headerShown: true,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerStyle: {
            backgroundColor: COLORS.secondary,
          },
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
          drawerType: "slide",
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
          title: "Social",
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Ionicons name="share-social-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Ionicons name="albums-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export { CustomDrawerNavigator };
