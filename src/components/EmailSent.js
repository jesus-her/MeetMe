import React from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { COLORS } from "../constants";

export default class EmailSent extends React.Component {
  render() {
    return (
      <View style={[StyleSheet.absoluteFillObject, styles.container]}>
        <LottieView
          source={require("../../assets/Loader/14453-sent.json")}
          autoPlay
          loop
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
});
