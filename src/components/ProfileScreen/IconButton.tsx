import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { COLORS, SIZES } from "../../constants";

const IconButton = ({ containerStyle, icon, iconStyle, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: SIZES.heightNav / 2.5,
          height: SIZES.heightNav / 2.5,
          tintColor: COLORS.white,
          ...iconStyle,
        }}
      />
    </TouchableOpacity>
  );
};

export default IconButton;
