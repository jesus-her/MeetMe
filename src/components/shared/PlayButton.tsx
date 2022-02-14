import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTS, SIZES } from "../../constants";
import IconLabel from "../IconLabel";
import icons from "../../constants/icons";

const PlayButton = ({ handleOnPress = null, label = "", icon = null }) => {
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.primary2]}
      start={{ x: 0.1, y: 0.5 }}
      end={{ x: 1, y: 1 }}
      style={{
        paddingBottom: insets.bottom,
        width: "100%",
        margin: 16,
        borderRadius: 16,
        zIndex: 0,
        alignSelf: "center",
      }}
    >
      <View style={styles.shadow} />
      <RectButton style={styles.button} onPress={handleOnPress}>
        <IconLabel
          label={label}
          icon={icon}
          containerStyle={{
            marginRight: SIZES.radius,
            alignSelf: "center",
          }}
          iconStyle={{
            width: 15,
            height: 15,
            tintColor: COLORS.white,
          }}
          labelStyle={{
            color: "white",
            ...FONTS.h2,
            letterSpacing: 5,
            textAlign: "center",
          }}
        />
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
    ...FONTS.h2,
    letterSpacing: 5,
    textAlign: "center",
  },
  shadow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.2)",
    zIndex: -2,
    borderRadius: 16,
    height: 43,
  },
});

export default PlayButton;
