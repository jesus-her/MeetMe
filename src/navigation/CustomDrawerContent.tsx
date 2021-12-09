import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { COLORS, FONTS, SIZES } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const CustomDrawerContent = (props) => {
  return (
    <>
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{
            marginBottom: 80,
            backgroundColor: COLORS.secondary,
          }}
        >
          <LinearGradient
            colors={["#FE5A51", "#FA7044", "#F58537"]}
            style={{
              height: 100,
              alignItems: "flex-start",
              justifyContent: "center",
              padding: SIZES.padding,
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Image
                source={require("../../assets/emoji.png")}
                style={{ width: 45, height: 45 }}
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                  Awesome User
                </Text>
                <Text style={{ color: COLORS.white, ...FONTS.h5 }}>
                  View your profile
                </Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
          <View
            style={{ flex: 1, backgroundColor: COLORS.white, paddingTop: 10 }}
          >
            <DrawerItemList {...props} />
          </View>
        </DrawerContentScrollView>

        <View
          style={{
            padding: SIZES.padding,
            borderTopColor: "#ccc",
            borderTopWidth: 1,
            marginHorizontal: 10,
          }}
        >
          <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="exit-outline" size={22} />
              <Text style={{ ...FONTS.h3, marginLeft: 5 }}>Exit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
export default CustomDrawerContent;
