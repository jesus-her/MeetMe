import React from "react";
import { TouchableOpacity, Text, Image, View } from "react-native";
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
  );
};

export default CustomButton;
