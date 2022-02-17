import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../../constants";
import { LinearGradient } from "expo-linear-gradient";
import { auth, storage } from "../../../firebase";
import { Audio } from "expo-av";
import FormButton from "./FormButton";
import IconLabel from "../IconLabel";

const QuizCard = ({
  currentQuizImage,
  currentQuizTitle,
  owner,
  QuizID,
  currentAudioId,
}) => {
  const user = auth.currentUser;
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);

  //Download audio
  const downloadAudio = async () => {
    const uri = await storage
      .ref(`/audio/quizzes/${currentAudioId}.m4a`)
      .getDownloadURL();

    console.log("uril:", uri);

    // The rest of this plays the audio
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync({ uri });
      await soundObject.playAsync();
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <>
      <LinearGradient
        colors={[COLORS.primary, COLORS.primary2]}
        start={{ x: 0.1, y: 0.5 }}
        end={{ x: 1, y: 1 }}
        style={{
          flexDirection: "row",
          paddingVertical: 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.primary2,
          paddingHorizontal: SIZES.radius,
          marginVertical: SIZES.base,
          width: "100%",
          alignSelf: "center",
          alignItems: "center",
        }}
      >
        {/*Profile Image*/}
        <View
          style={{
            width: SIZES.width / 3.5,
            height: SIZES.width / 3.5,
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          {currentQuizImage != "" ? (
            <Image
              source={{
                uri: currentQuizImage,
              }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 100,
                borderWidth: 2,
                borderColor: COLORS.white,
                alignSelf: "center",
              }}
            />
          ) : (
            <Image
              source={require("../../../assets/icons/laughing.png")}
              resizeMode="cover"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 100,
                borderWidth: 2,
                borderColor: COLORS.white,
                alignSelf: "center",
                tintColor: COLORS.white,
              }}
            />
          )}
        </View>
        {/* Details */}
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.white,
              textAlign: "center",
              backgroundColor: COLORS.primary,
              borderRadius: 50,
              paddingHorizontal: SIZES.radius,
              paddingVertical: 5,
            }}
          >
            {currentQuizTitle} Quiz
          </Text>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h5,
            }}
          >
            Created by
          </Text>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h2,
              textAlign: "center",
            }}
          >
            {owner}
          </Text>
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.primary,
              textAlign: "center",
              backgroundColor: COLORS.white,
              borderRadius: SIZES.radius,
              paddingHorizontal: SIZES.base,
              marginTop: SIZES.base,
            }}
          >
            Quiz ID: {QuizID}
          </Text>
          {/*Total questions*/}

          {/*<FormButton
            labelText="Audio"
            handleOnPress={downloadAudio}
            style={{ marginTop: SIZES.padding }}
          />*/}
        </View>
      </LinearGradient>
    </>
  );
};

export default QuizCard;
