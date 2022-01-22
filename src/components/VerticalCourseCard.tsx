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
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
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
        <Image
          source={{ uri: quizImage }}
          resizeMode="cover"
          style={{
            height: 100,
            width: 100,
            alignSelf: "center",

            borderRadius: 50,
            borderColor: COLORS.white,
            borderWidth: 2,
          }}
        />
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
          }}
        >
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
