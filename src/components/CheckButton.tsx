import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../constants";
import { LinearGradient } from "expo-linear-gradient";

const CheckButton = () => {
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.primary2]}
      style={{
        paddingBottom: insets.bottom,
        width: SIZES.width / 2,
        margin: 16,
        borderRadius: 16,
        zIndex: 1,
      }}
    >
      <View style={styles.shadow} />
      <RectButton style={styles.button}>
        <Text style={styles.label}>CHECK</Text>
      </RectButton>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  containerGradient: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "100%",
    height: 40,
    borderRadius: 16,
    justifyContent: "center",
  },
  label: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 5,
    textAlign: "center",
  },
  shadow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(29,29,29,0.3)",
    zIndex: -1,
    borderRadius: 16,
    height: 45,
  },
});

export default CheckButton;
