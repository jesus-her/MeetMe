import * as React from "react";
import { ScrollView, StatusBar, StyleSheet } from "react-native";
import { SIZES } from "../constants";
import HorizontalSwipe from "../components/PlayScreen/HorizontalSwipe/HorizontalSwipe";
import LiquidSwipe from "../components/PlayScreen/LiquidSwipe";
import PhilzCoffee from "../components/PlayScreen/PhilzCoffee";
import Billboard from "../components/PlayScreen/Billboard/Billboard";
import StackCarousel from "../components/PlayScreen/StackCarousel/StackCarousel";
import MusicPlayer from "../components/PlayScreen/MusicPlayer/MusicPlayer";
import TinderSwipe from "../components/PlayScreen/TinderClone/TinderSwipe";
import HorizontalSwipeFirebase from "../components/PlayScreen/HorizontalSwipe/HorizontalSwipeFirebase";

const PlayScreen = () => {
  return (
    <ScrollView style={styles.scrollView} pagingEnabled={true}>
      <HorizontalSwipe />
      {/*<Puzzle />*/}
      {/* <Duolingo />*/}
      <PhilzCoffee />
      <LiquidSwipe />
      <Billboard />
      <StackCarousel />
      <MusicPlayer />
      <TinderSwipe />
      {/*<Bedtime />*/}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    width: SIZES.width,
    height: SIZES.height,
  },
});

export default PlayScreen;
