import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary2,
    width: "100%",
    height: 45,
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
    <View
      style={{
        position: "absolute",
        bottom: 0,
        width: SIZES.width / 2,
        paddingBottom: insets.bottom,
        alignItems: "center",
        justifyContent: "center",
        margin: 16,
      }}
    >
      <View
        style={{
          backgroundColor: "rgba(29,29,29,0.3)",
          borderRadius: 16,
          height: 50,
          ...StyleSheet.absoluteFillObject,
        }}
      />
      <RectButton style={styles.button}>
        <Text style={styles.label}>CHECK</Text>
      </RectButton>
    </View>
  );
};

export default Footer;
