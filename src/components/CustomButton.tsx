import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTS, SIZES } from "../constants";

const CustomButton = ({ label, onPress, icon }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={[COLORS.secondary, COLORS.primary]}
        style={styles.containerGradient}
        start={{ x: 0.1, y: 0.5 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.shadow} />
        <Image source={icon} resizeMode="contain" style={styles.icon} />
        <Text style={styles.label}> {label} </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: SIZES.width / 1.1,
    height: 50,
  },
  containerGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  shadow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(29,29,29,0.25)",
    zIndex: -1,
    borderRadius: 50,
    height: 55,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: COLORS.white,
    marginRight: 10,
  },
  label: {
    ...FONTS.h2,
    color: COLORS.white,
  },
});

export default CustomButton;
