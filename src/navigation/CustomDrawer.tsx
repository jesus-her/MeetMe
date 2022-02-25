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
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import CustomTab from "./CustomTab";
import ByQuizId from "../screens/ByQuizId";
import MyQuizzes from "../screens/MyQuizzesScreen";
import Favorites from "../screens/Favorites";

const Drawer = createDrawerNavigator();

const CustomDrawer = ({ selectedTab, setSelectedTab }) => {
  return (
    <>
      <View style={{ flex: 1 }}>
        <Drawer.Navigator
          initialRouteName="Home"
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
            name="MyQuizzes"
            component={MyQuizzes}
            options={{
              title: "My Quizzes",
              headerShown: false,
              drawerIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="format-list-text"
                  size={22}
                  color={color}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="FindByQuizId"
            component={ByQuizId}
            options={{
              title: "Quiz ID",
              headerShown: false,
              drawerIcon: ({ color }) => (
                <FontAwesome name="qrcode" size={22} color={color} />
              ),
            }}
          />

          {/*<Drawer.Screen
            name="Favorites"
            component={Favorites}
            options={{
              title: "Favorites",
              headerShown: false,
              drawerIcon: ({ color }) => (
                <MaterialIcons name="favorite" size={22} color={color} />
              ),
            }}
          />*/}
        </Drawer.Navigator>
      </View>
    </>
  );
};

export default CustomDrawer;
