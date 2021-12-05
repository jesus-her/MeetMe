import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";
import { COLORS, FONTS } from "../constants";

const CustomButton = ({
  contentContainerStyle,
  disabled,
  label,
  labelStyle,
  onPress,
  icon,
  iconStyle,
}) => {
  return (
    <TouchableOpacity
      style={{
        zIndex: 10,
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "row",
        ...contentContainerStyle,
      }}
      disabled={disabled}
      onPress={onPress}
    >
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: 20,
          height: 20,
          tintColor: COLORS.black,
          ...iconStyle,
        }}
      />
      <Text
        style={{
          color: COLORS.white,
          ...FONTS.h3,
          ...labelStyle,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
