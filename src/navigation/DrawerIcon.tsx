import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FONTS } from "../constants";
import { Ionicons } from "@expo/vector-icons";

const DrawerIcon = ({ label, onPress, icon }) => {
  return (
    <>
      <TouchableOpacity onPress={onPress} style={{ paddingVertical: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name={icon} size={22} />
          <Text style={{ ...FONTS.h3, marginLeft: 10 }}>{label}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default DrawerIcon;
