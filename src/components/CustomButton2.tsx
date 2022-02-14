import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import { COLORS, FONTS, SIZES } from "../constants";
import { LinearGradient } from "expo-linear-gradient";

const CheckButton2 = ({ label, onPress, icon, colors, labelStyle }) => {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 1, y: 0.1 }}
      end={{ x: 1, y: 0.75 }}
      /*start={{ x: 0.1, y: 0.5 }}
      end={{ x: 1, y: 1 }}*/
      style={styles.container}
    >
      <RectButton style={styles.button} onPress={onPress}>
        <Image source={icon} resizeMode="cover" style={styles.icon} />
        <Text style={{ ...FONTS.h3, color: COLORS.white, ...labelStyle }}>
          {label}
        </Text>
      </RectButton>
      <View style={styles.shadow} />
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "85%",
    borderRadius: 50,
    height: SIZES.width / 12,
    backgroundColor: "white",
    alignSelf: "center",
    marginBottom: SIZES.radius,
  },
  button: {
    width: "100%",
    height: "100%",
    borderRadius: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  shadow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(29,29,29,0.3)",
    zIndex: -1,

    borderRadius: 50,
    height: SIZES.width / 12 + 5,
  },
  icon: {
    width: 22,
    height: 22,
    tintColor: COLORS.white,
    marginRight: 10,
    resizeMode: "cover",
  },
});

export default CheckButton2;
