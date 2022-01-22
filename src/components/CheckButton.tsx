import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../constants";
import { LinearGradient } from "expo-linear-gradient";

const CheckButton = ({ handleOnPress = null }) => {
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.primary2]}
      start={{ x: 0.1, y: 0.5 }}
      end={{ x: 1, y: 1 }}
      style={{
        paddingBottom: insets.bottom,
        width: SIZES.width / 2,
        margin: 16,
        borderRadius: 16,
        zIndex: 0,
        alignSelf: "center",
      }}
    >
      <View style={styles.shadow} />
      <RectButton style={styles.button} onPress={handleOnPress}>
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
    width: "90%",
    height: 40,
    borderRadius: 16,
    justifyContent: "center",
    alignSelf: "center",
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
    zIndex: -2,
    borderRadius: 16,
    height: 45,
  },
});

export default CheckButton;
