import React from "react";
import { View } from "react-native";
import { COLORS } from "../constants";

const LineDivider = ({ lineStyle }) => {
  return (
    <View
      style={{
        width: "90%",
        height: 2,
        backgroundColor: COLORS.gray20,
        alignSelf: "center",
        ...lineStyle,
      }}
    />
  );
};

export default LineDivider;
