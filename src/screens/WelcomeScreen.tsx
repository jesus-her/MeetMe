import React from "react";
import { View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Onboarding from "../components/WelcomeScreen/Onboarding";

const WelcomeScreen = () => {
  return (
    <>
      <Onboarding />
    </>
  );
};

export default WelcomeScreen;
