import React from "react";
import { View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import WeeksScreen from "../screens/WeeksScreen";
import CustomDrawerContent from "./CustomDrawerContent";
import { COLORS, FONTS, SIZES } from "../constants";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Picker from "../Picker/Picker";
import { Ionicons } from "@expo/vector-icons";
import CustomTab from "./CustomTab";

const Drawer = createDrawerNavigator();

const CustomDrawer = ({ selectedTab, setSelectedTab }) => {
  return (
    <>
      <View style={{ flex: 1 }}>
        <Drawer.Navigator
          initialRouteName="BottomTab"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            drawerActiveBackgroundColor: COLORS.secondary,
            drawerActiveTintColor: COLORS.white,
            drawerLabelStyle: { marginLeft: -20, ...FONTS.h3 },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerStyle: {
              backgroundColor: COLORS.primary,
              height: SIZES.heightNav,
            },
            drawerType: "slide",
          }}
        >
          {/*<Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "Inicio",
              headerShown: true,
              drawerIcon: ({ color }) => (
                <Ionicons name="home-outline" size={22} color={color} />
              ),
            }}
          />*/}
          <Drawer.Screen
            name="BottomTab"
            component={CustomTab}
            options={{
              title: "Home",
              headerShown: false,
              drawerIcon: ({ color }) => (
                <Ionicons name="home-outline" size={22} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{
              title: "Welcome",
              headerShown: false,
              drawerIcon: ({ color }) => (
                <Ionicons name="albums-outline" size={22} color={color} />
              ),
            }}
          />
        </Drawer.Navigator>
      </View>
    </>
  );
};

export default CustomDrawer;
