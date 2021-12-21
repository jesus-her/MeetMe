import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { LinearGradient } from "expo-linear-gradient";
import DrawerFooter from "./DrawerFooter";

const CustomDrawerContent = (props) => {
  return (
    <>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.container}
      >
        <LinearGradient
          colors={[COLORS.secondary, COLORS.primary2]}
          start={{ x: 0.1, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={styles.containerGradient}
        >
          <TouchableOpacity style={styles.containerProfile}>
            <Image
              source={require("../../assets/CustomDrawerNavigator/emoji.png")}
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
        <View style={{ backgroundColor: COLORS.white, paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <DrawerFooter />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: -10,
    width: "100%",
    height: "100%",
  },
  containerGradient: {
    height: 100,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: SIZES.padding,
  },
  containerProfile: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtitle: {
    ...FONTS.h2,
    color: COLORS.primary2,
    letterSpacing: 5,
    textAlign: "center",
  },
  buttonContainer: {
    height: SIZES.height / 4,
    justifyContent: "space-around",
    alignItems: "center",
  },
});
export default CustomDrawerContent;
