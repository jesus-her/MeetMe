import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { LinearGradient } from "expo-linear-gradient";
import DrawerFooter from "./DrawerFooter";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebase";

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();
  const user = auth.currentUser;
  return (
    <>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.container}
      >
        <LinearGradient
          colors={[COLORS.primary, COLORS.primary2]}
          start={{ x: 1, y: 0.1 }}
          end={{ x: 1, y: 1 }}
          style={styles.containerGradient}
        >
          <TouchableOpacity
            style={styles.containerProfile}
            onPress={() => {
              navigation.navigate("Profile");
            }}
          >
            {user.photoURL === null ? (
              <Image
                source={{ uri: "https://i.imgur.com/IN5sYw6.png" }}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  borderWidth: 1,
                  borderColor: COLORS.white,
                }}
              />
            ) : (
              <Image
                source={{ uri: user.photoURL }}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  borderWidth: 1,
                  borderColor: COLORS.white,
                }}
              />
            )}
            <View
              style={{
                marginLeft: 10,

                flexDirection: "column",
                maxWidth: SIZES.width / 2.25,
              }}
            >
              <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                {user.displayName}
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
        <View>
          <Image
            source={require("../../assets/TheQuizLogoWhiteBackground.png")}
            resizeMode="contain"
            style={{
              width: SIZES.width / 2,
              height: SIZES.width / 4,

              alignSelf: "center",
              marginTop: SIZES.padding,
            }}
          />
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
