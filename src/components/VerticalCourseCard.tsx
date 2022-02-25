import React from "react";
import { TouchableOpacity, Text, View, Image } from "react-native";
import { COLORS, FONTS, SIZES, icons } from "../constants";
import IconLabel from "./IconLabel";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebase";

const VerticalCourseCard = ({
  containerStyle,
  course,
  quizTitle,
  quizImage,
  owner,
  quizId,
  quizAttempts,
  ownerPhoto,
}) => {
  const navigation = useNavigation();
  const user = auth.currentUser;
  return (
    <>
      <View style={{ paddingBottom: SIZES.padding }}>
        <View
          style={{
            marginLeft: SIZES.padding,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {ownerPhoto != null ? (
            <Image
              source={{ uri: ownerPhoto }}
              style={{
                width: 45,
                height: 45,
                borderRadius: 40,
                borderWidth: 2,
                borderColor: COLORS.additionalColor9,
              }}
            />
          ) : (
            <Image
              source={{ uri: "https://i.imgur.com/IN5sYw6.png" }}
              style={{
                width: 45,
                height: 45,
                borderRadius: 40,
                borderWidth: 2,
                borderColor: COLORS.additionalColor9,
              }}
            />
          )}

          <Text
            style={{
              color: COLORS.black,
              marginLeft: SIZES.base,
              ...FONTS.h4,
              width: SIZES.width / 2.5,
            }}
          >
            {owner}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: COLORS.white,
            width: 270,
            elevation: 3,
            borderRadius: SIZES.radius,
            alignSelf: "center",
            marginTop: SIZES.base,
            ...containerStyle,
          }}
        >
          {/* Thumbnail */}
          <LinearGradient
            colors={[COLORS.primary, COLORS.primary2]}
            start={{ x: 0.1, y: 0.5 }}
            end={{ x: 1, y: 1 }}
            style={{
              marginBottom: SIZES.radius,
              borderRadius: SIZES.radius,
            }}
          >
            {quizImage != "" ? (
              <Image
                source={{ uri: quizImage }}
                resizeMode="cover"
                style={{
                  height: 110,
                  width: 110,
                  alignSelf: "center",
                  borderWidth: 1,
                  borderColor: COLORS.gray20,
                  borderRadius: 60,
                }}
              />
            ) : (
              <Image
                source={require("../../assets/icons/laughing.png")}
                resizeMode="cover"
                style={{
                  height: 110,
                  width: 110,
                  alignSelf: "center",
                  borderRadius: 60,

                  tintColor: COLORS.white,
                  borderWidth: 1,
                  borderColor: COLORS.gray20,
                }}
              />
            )}
          </LinearGradient>

          {/* Details */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {/* Leaderboard */}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Leaderboard", {
                  quizId: quizId,
                  quizImg: quizImage,
                  quizOwner: owner,
                  quizTitle: quizTitle,
                });
              }}
              style={{
                width: 45,
                height: 45,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 25,
                backgroundColor: COLORS.primary3,
                position: "relative",
              }}
            >
              <Image
                source={icons.podium}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: COLORS.white,
                }}
              />
            </TouchableOpacity>

            {/* Info */}

            <View
              style={{
                paddingHorizontal: SIZES.radius,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontSize: quizTitle.length < 10 ? 18 : 14,
                  fontWeight: "bold",
                }}
              >
                {quizTitle}
              </Text>

              <Text
                style={{
                  ...FONTS.h5,
                  color: COLORS.primary,
                }}
              >
                Quiz ID: {quizId}
              </Text>
            </View>
            {/* Play */}
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => {
                navigation.navigate("PlayQuiz", {
                  quizId: quizId,
                  quizImg: quizImage,
                  quizOwner: owner,
                });
              }}
              style={{
                width: 45,
                height: 45,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 25,
                backgroundColor: COLORS.secondary,
                position: "relative",
              }}
            >
              <View
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
                    marginBottom: -10,
                    width: 20,
                    height: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: COLORS.primary2,
                    borderRadius: 15,
                  }}
                >
                  {/* Camera Icon*/}
                  <Text style={{ ...FONTS.h5, color: COLORS.white }}>
                    {quizAttempts}
                  </Text>
                </View>
              </View>

              <Image
                source={icons.play}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.white,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default VerticalCourseCard;
