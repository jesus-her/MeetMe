import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";
import { RectButton } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

const FormButton = ({
  labelText = "",
  handleOnPress = null,
  style,
  isPrimary = true,
  ...more
}) => {
  return (
    <LinearGradient
      colors={[
        isPrimary ? COLORS.primary : COLORS.white,
        isPrimary ? COLORS.primary2 : COLORS.white,
      ]}
      start={{ x: 0.1, y: 0.5 }}
      end={{ x: 1, y: 1 }}
      style={{
        margin: 16,
        borderRadius: 30,
        zIndex: 0,
        alignSelf: "center",
        borderWidth: 1,
        borderColor: COLORS.primary,
        width: "100%",
        height: 40,
        ...style,
      }}
    >
      <View style={styles.shadow} />
      <RectButton style={styles.button} onPress={handleOnPress}>
        <Text
          style={{
            textAlign: "center",
            ...FONTS.h2,
            color: isPrimary ? COLORS.white : COLORS.primary,
          }}
        >
          {labelText}
        </Text>
      </RectButton>
    </LinearGradient>

    /*<TouchableOpacity
      style={{
        paddingVertical: 10,
        backgroundColor: isPrimary ? COLORS.primary : COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: SIZES.radius * 5,
        ...style,
      }}
      activeOpacity={0.9}
      onPress={handleOnPress}
      {...more}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          color: isPrimary ? COLORS.white : COLORS.primary,
        }}
      >
        {labelText}
      </Text>
    </TouchableOpacity>*/
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
    justifyContent: "center",
    alignSelf: "center",

    borderRadius: 30,
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
    borderRadius: 30,
    height: 45,
    width: "100%",
  },
});

export default FormButton;
