import React from "react";
import { TouchableOpacity, Text, Image, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import { LinearGradient } from "expo-linear-gradient";

const CustomButton = ({
  colors,
  contentContainerStyle,
  disabled,
  label,
  labelStyle,
  onPress,
  icon,
  iconStyle,
}) => {
  return (
    <LinearGradient colors={colors} style={{ borderRadius: SIZES.radius }}>
      <TouchableOpacity
        style={{
          zIndex: 999,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          ...contentContainerStyle,
        }}
        disabled={disabled}
        onPress={onPress}
      >
        <View
          style={{
            marginRight: 10,
          }}
        >
          <Image
            source={icon}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
              ...iconStyle,
            }}
          />
        </View>
        <Text
          style={{
            ...FONTS.h2,
            ...labelStyle,
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default CustomButton;
