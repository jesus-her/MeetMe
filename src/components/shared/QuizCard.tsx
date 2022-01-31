import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../../constants";
import { LinearGradient } from "expo-linear-gradient";
import { auth } from "../../../firebase";

const QuizCard = ({ currentQuizImage, currentQuizTitle, owner, QuizID }) => {
  const user = auth.currentUser;
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
            width: 100,
            height: 100,
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
                borderRadius: 50,
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
                borderRadius: 50,
                borderWidth: 2,
                borderColor: COLORS.white,
                alignSelf: "center",
              }}
            />
          )}

          {/*<View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                marginBottom: -15,
                width: 30,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.secondary,
                borderRadius: 15,
              }}
            >
              Camera Icon
              <Image
                source={icons.camera}
                resizeMode="contain"
                style={{
                  width: 17,
                  height: 17,
                }}
              />
            </View>
          </View>*/}
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
              borderRadius: SIZES.radius,
              paddingHorizontal: SIZES.base,
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
        </View>
      </LinearGradient>
    </>
  );
};

export default QuizCard;
