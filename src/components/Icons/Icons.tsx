import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export const Icons = {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Feather,
  Entypo,
};

const Icon = ({ type, name, color, size = 24, style }) => {
  const fontSize = 24;
  const Tag = type;
  return (
    <>
      {type && name && (
        <Tag name={name} size={size || fontSize} color={color} style={style} />
      )}
    </>
  );
};

export default Icon;
