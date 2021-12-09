import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SIZES } from "../constants";
import HorizontalSwipe from "../components/playScreen/HorizontalSwipe";
import LiquidSwipe from "../LiquidSwipe";
import Chrome from "../Chrome";
import Duolingo from "../Duolingo";
import PhilzCoffee from "../PhilzCoffee";

const PlayScreen = () => {
  return (
    <>
      <ScrollView style={styles.scrollView} pagingEnabled={true}>
        <HorizontalSwipe />
        <Chrome />
        <Duolingo />
        <PhilzCoffee />
        <LiquidSwipe />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    width: SIZES.width,
    height: SIZES.height,
  },
});

export default PlayScreen;
