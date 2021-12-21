import React from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTS, SIZES } from "../constants";
import CustomButton from "../components/CustomButton";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <>
      <ImageBackground
        source={require("../../assets/HomeScreen/card1.png")}
        style={styles.container}
        imageStyle={{
          opacity: 1,
        }}
        blurRadius={3}
      >
        <View>
          <Image
            source={require("../../assets/adaptive-icon_NO_background.png")}
            style={styles.logo}
          />
          <Text style={styles.appName}>App Name</Text>
        </View>
        <View>
          <Text style={styles.title}> Let's Play! </Text>
          <Text style={styles.subtitle}> Invite your friends </Text>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            label="Play Now"
            onPress={() => {
              navigation.navigate("Play");
            }}
            icon={require("../../assets/HomeScreen/fire.png")}
          />
          <CustomButton
            label="My Quiz"
            onPress={() => {
              navigation.navigate("Picker");
            }}
            icon={require("../../assets/HomeScreen/forma-de-vineta.png")}
          />
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SIZES.height - SIZES.heightNav,
    width: SIZES.width,
    padding: SIZES.padding,
    justifyContent: "space-around",
    alignItems: "center",
  },
  logo: {
    resizeMode: "cover",
    backgroundColor: COLORS.primary,
    width: 150,
    height: 150,
    borderRadius: SIZES.radius,
    overflow: "hidden",
  },
  appName: {
    ...FONTS.h2,
    color: COLORS.white,
    textAlign: "center",
  },
  title: {
    ...FONTS.h1,
    color: COLORS.black,
    letterSpacing: 7,
    textAlign: "center",
  },
  subtitle: {
    ...FONTS.h2,
    color: COLORS.black,
    letterSpacing: 5,
    textAlign: "center",
  },
  buttonContainer: {
    height: SIZES.height / 4,
    justifyContent: "space-around",
    alignItems: "center",
  },
});
export default HomeScreen;
