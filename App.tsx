import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import CustomStackNavigator from "./src/navigation/CustomStackNavigator";
console.log("statusBarHeight: ", StatusBar.currentHeight);
const App = () => {
  return (
    <>
      <StatusBar
        hidden={false}
        backgroundColor="#3A0CA3"
        translucent={false}
        barStyle="light-content"
      />

      <NavigationContainer>
        <CustomStackNavigator />
      </NavigationContainer>
    </>
  );
};

export default App;
