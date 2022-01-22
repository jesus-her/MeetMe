import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import FindQuizScreen from "../screens/FindQuizScreen";
import { COLORS, SIZES } from "../constants";
import { COL } from "../components/PlayScreen/Puzzle/Config";
import { Ionicons } from "@expo/vector-icons";
import CreateQuizScreen from "../screens/CreateQuizScreen";

const Tab = createBottomTabNavigator();

const CustomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          height: SIZES.heightNav,
        },
        tabBarInactiveTintColor: COLORS.gray80,
        tabBarActiveTintColor: COLORS.secondary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={SIZES.heightNav / 2} />
          ),
        })}
      />
      <Tab.Screen
        name="TabCreateQuiz"
        component={CreateQuizScreen}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="ios-add-circle-sharp"
              color={color}
              size={SIZES.heightNav / 1.5}
            />
          ),
        })}
      />
      <Tab.Screen
        name="NewFindScreen"
        component={FindQuizScreen}
        options={{
          tabBarBadge: 5,
          tabBarBadgeStyle: { backgroundColor: COLORS.primary2 },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={SIZES.heightNav / 2} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default CustomTab;
