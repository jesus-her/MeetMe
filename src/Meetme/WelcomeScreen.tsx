import React from "react";
import { Button, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SIZES } from "../constants";
/*import meetmeService from "../services/MeetmeRequest";*/

const WelcomeScreen = () => {
  /*  const onButtonPress = async () => {
            const response = await meetmeService.ListQuiz();
            console.log(response);*/
  const navigation = useNavigation();
  return (
    <>
      <View
        style={{
          height: SIZES.height,
          width: SIZES.width,
        }}
      >
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
              fontSize: SIZES.h1,
            }}
          >
            {" "}
            MeetMe App (logo)
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 30,
          }}
        >
          <Button
            onPress={() => {
              navigation.navigate("Picker");
            }}
            title="My Quiz"
          />
          <Button
            onPress={() => {
              navigation.navigate("PlayScreen");
            }}
            title="Play"
          />
        </View>
      </View>
    </>
  );
};
export default WelcomeScreen;
