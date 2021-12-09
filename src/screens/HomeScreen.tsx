import React from "react";
import { View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTS, SIZES } from "../constants";
import CustomButton from "../components/CustomButton";
import { LinearGradient } from "expo-linear-gradient";
/*import meetmeService from "../services/MeetmeRequest";*/

const HomeScreen = () => {
  /*  const onButtonPress = async () => {
            const response = await meetmeService.ListQuiz();
            console.log(response);*/
  const navigation = useNavigation();
  return (
    <>
      <LinearGradient
        colors={["#035796", "#0195E5"]}
        style={{
          height: SIZES.height - 56,
          width: SIZES.width,
          justifyContent: "space-around",
          alignItems: "center",
          padding: SIZES.padding,
        }}
      >
        <View
          style={{
            width: 200,
            height: 200,
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/sunny.gif")}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
          <Text
            style={{
              ...FONTS.h1,
              color: COLORS.primary2,
              marginTop: 10,
            }}
          >
            MeetMe App
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            padding: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              ...FONTS.h1,
              color: COLORS.white,
              letterSpacing: 7,
            }}
          >
            Let's Play!
          </Text>
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.white,
              letterSpacing: 5,
            }}
          >
            Invite your friends
          </Text>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            height: 100,
            width: "100%",
          }}
        >
          <CustomButton
            colors={["#FE5A51", "#FA7044", "#F58537"]}
            onPress={() => {
              navigation.navigate("Play");
            }}
            label="Play Now"
            icon={require("../../assets/fire.png")}
            iconStyle={{
              tintColor: COLORS.white,
            }}
            contentContainerStyle={{
              borderRadius: SIZES.radius,
              height: 40,
            }}
            labelStyle={{
              textAlign: "center",
              color: COLORS.white,
            }}
          />
          <CustomButton
            colors={["#FE5A51", "#FA7044", "#F58537"]}
            onPress={() => {
              navigation.navigate("Picker");
            }}
            label="My Quiz"
            icon={require("../../assets/forma-de-vineta.png")}
            iconStyle={{
              tintColor: COLORS.white,
            }}
            contentContainerStyle={{
              borderRadius: SIZES.radius,
              height: 40,
            }}
            labelStyle={{
              textAlign: "center",
              color: COLORS.white,
            }}
          />
        </View>
      </LinearGradient>
    </>
  );
};
export default HomeScreen;
