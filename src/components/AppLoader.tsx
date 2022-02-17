import React from "react";
import { View, StyleSheet } from "react-native";

import LottieView from "lottie-react-native";
import { COLORS, SIZES } from "../constants";

const AppLoader = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <LottieView
        source={require("../../assets/Loader/95771-loading-animation.json")}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    height: SIZES.height,
  },
});

export default AppLoader;
