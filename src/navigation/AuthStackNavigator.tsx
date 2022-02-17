import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPassword from "../screens/ForgotPassword";
import WelcomeScreen from "../screens/WelcomeScreen";
import AppLoader from "../components/AppLoader";
import { COLORS, SIZES } from "../constants";

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <>
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
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="SignInScreen"
          component={SignInScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            title: "",
          }}
          name="SignUpScreen"
          component={SignUpScreen}
        />
        <Stack.Screen
          options={{
            title: "",
            headerShown: true,
          }}
          name="ForgotPassword"
          component={ForgotPassword}
        />
      </Stack.Navigator>
    </>
  );
};

export default AuthStackNavigator;
