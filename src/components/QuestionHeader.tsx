import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
const SIZE = SIZES.width - 75;
const QuestionHeader = ({
  label,
  textColor,
  colors,
  containerStyle,
  question,
}) => {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0.1, y: 0.5 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, { ...containerStyle }]}
    >
      <Text style={[styles.title, { color: textColor }]}>{label}</Text>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    /* width: SIZES.width - SIZES.padding / 0.33,*/
    width: SIZE - 30,

    elevation: 5,
    borderRadius: SIZES.radius,
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.padding,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -75 }, { translateY: 15 }],
  },
  title: {
    textAlign: "center",
    ...FONTS.h1,
    letterSpacing: 2,
  },
});

export default QuestionHeader;
