import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { MainStackNavigator } from "./src/navigation/StackNavigator";
import { CustomDrawerNavigator } from "./src/navigation/CustomDrawerNavigator";

const App = () => {
  return (
    <>
      <NavigationContainer>
        <StatusBar hidden={true} />
        {/*  <MainStackNavigator />*/}
        <CustomDrawerNavigator />
      </NavigationContainer>
    </>
  );
};

export default App;
