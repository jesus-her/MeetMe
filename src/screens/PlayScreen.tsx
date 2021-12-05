import * as React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from "react-native";
import { SIZES } from "../constants";
import HorizontalSwipe from "../components/playScreen/HorizontalSwipe";
import LiquidSwipe from "../LiquidSwipe";
import Channel from "../Chanel";
import Chrome from "../Chrome";
import Duolingo from "../Duolingo";
import PhilzCoffee from "../PhilzCoffee";
import Rainbow from "../Rainbow";
import { Reflectly } from "../Reflectly";
import Snapchat from "../Snapchat/Snapchat";
import Darkroom from "../Darkroom";
import Picker from "../Picker/Picker";
import WelcomeScreen from "../Meetme/WelcomeScreen";

const PlayScreen = () => {
  return (
    <>
      <ScrollView style={styles.scrollView} pagingEnabled={true}>
        <HorizontalSwipe />
        <Chrome />
        <Duolingo />
        <PhilzCoffee />
        {/*<Rainbow />*/}
        {/*<Reflectly />*/}
        {/* <Snapchat />*/}
        {/* <Darkroom />*/}
        <LiquidSwipe />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "pink",
    width: SIZES.width,
    height: SIZES.height,
  },
});

export default PlayScreen;
