import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../constants";
import { LinearGradient } from "expo-linear-gradient";

const styles = StyleSheet.create({
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
    textAlign: "center",
  },
});

const Footer = () => {
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={["#FE5A51", "#FA7044", "#F58537"]}
      style={{
        zIndex: 99,
        position: "relative",
        bottom: 0,
        width: SIZES.width / 2,
        paddingBottom: insets.bottom,
        alignItems: "center",
        justifyContent: "center",
        margin: 16,
        borderRadius: 16,
      }}
    >
      <View
        style={{
          backgroundColor: "rgba(29,29,29,0.3)",
          zIndex: -1,
          borderRadius: 16,
          height: 47,
          ...StyleSheet.absoluteFillObject,
        }}
      />
      <RectButton style={styles.button}>
        <Text style={styles.label}>CHECK</Text>
      </RectButton>
    </LinearGradient>
  );
};

export default Footer;
