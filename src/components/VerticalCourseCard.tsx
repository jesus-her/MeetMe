import React from "react";
import { TouchableOpacity, Text, View, Image } from "react-native";
import { COLORS, FONTS, SIZES, icons } from "../constants";
import IconLabel from "./IconLabel";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const VerticalCourseCard = ({
  containerStyle,
  course,
  quizTitle,
  quizImage,
  owner,
  quizId,
  quizAttempts,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        backgroundColor: COLORS.white,
        width: 270,
        height: "95%",
        elevation: 3,
        borderRadius: SIZES.radius,
        alignSelf: "center",
        ...containerStyle,
      }}
      onPress={() => {
        navigation.navigate("PlayQuiz", {
          quizId: quizId,
          quizImg: quizImage,
          quizOwner: owner,
        });
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
        }}
      >
        {/* Play */}
        <View
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
            }}
          />
        </View>

        {/* Info */}

        <View
          style={{
            flexShrink: 1,
            paddingHorizontal: SIZES.radius,
          }}
        >
          <Text
            style={{
              flex: 1,
              ...FONTS.h3,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {quizTitle}
          </Text>

          <IconLabel
            icon={icons.profile}
            label={owner}
            iconStyle={{
              width: 25,
              height: 25,
              tintColor: COLORS.additionalColor4,
            }}
            containerStyle={{
              marginTop: SIZES.base,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VerticalCourseCard;
