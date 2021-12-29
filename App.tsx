import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import CustomStackNavigator from "./src/navigation/CustomStackNavigator";
import { MainProvider } from "./src/context/Context"

console.log("statusBarHeight: ", StatusBar.currentHeight);
const App = () => {
  return (
    <>
      <MainProvider>
        <StatusBar
          hidden={false}
          backgroundColor="#3A0CA3"
          translucent={false}
          barStyle="light-content"
        />

        <NavigationContainer>
          <CustomStackNavigator />
        </NavigationContainer>
      </MainProvider>
    </>
  );
};

export default App;
