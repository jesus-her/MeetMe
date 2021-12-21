import * as React from "react";
import { ScrollView, StatusBar, StyleSheet } from "react-native";
import { SIZES } from "../constants";
import HorizontalSwipe from "../components/PlayScreen/HorizontalSwipe/HorizontalSwipe";
import LiquidSwipe from "../components/PlayScreen/LiquidSwipe";
import Puzzle from "../components/PlayScreen/Puzzle";
import Duolingo from "../components/PlayScreen/Duolingo";
import PhilzCoffee from "../components/PlayScreen/PhilzCoffee";
import Billboard from "../components/PlayScreen/Billboard/Billboard";
import StackCarousel from "../components/PlayScreen/StackCarousel/StackCarousel";

const PlayScreen = ({ navigation }) => {
  return (
    <>
      <StatusBar
        hidden={true}
        backgroundColor="#3A0CA3"
        translucent={false}
        barStyle="light-content"
      />
      <ScrollView style={styles.scrollView} pagingEnabled={true}>
        <HorizontalSwipe />
        <Puzzle />
        <Duolingo />
        <PhilzCoffee />
        <LiquidSwipe />
        <Billboard />
        <StackCarousel />
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
