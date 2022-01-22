import React from "react";
import {
  TouchableOpacity,
  Text,
  ImageBackground,
  View,
  Image,
} from "react-native";
import { COLORS, FONTS, SIZES, icons } from "../constants";
import IconLabel from "./IconLabel";
import CustomButton2 from "./CustomButton2";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HorizontalCourseCard = ({
  course,
  containerStyle,
  quizImage,
  quizTitle,
  owner,
  quizId,
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: SIZES.radius,
        elevation: 3,
        ...containerStyle,
      }}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          width: 30,
          height: 30,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 5,
          backgroundColor: COLORS.white,
          elevation: 3,
        }}
      >
        <Image
          source={icons.favourite}
          resizeMode="contain"
          style={{
            width: 20,
            height: 20,
            borderRadius: 60,
            tintColor: COLORS.secondary,
          }}
        />
      </TouchableOpacity>
      {quizImage != "" ? (
        <Image
          source={{ uri: quizImage }}
          resizeMode="cover"
          style={{
            height: 120,
            width: 120,
            borderRadius: 60,
            borderWidth: 3,
            borderColor: COLORS.primary,
          }}
        />
      ) : (
        <Image
          source={require("../../assets/icons/laughing.png")}
          resizeMode="cover"
          style={{
            height: 120,
            width: 120,
            borderRadius: 60,
            borderWidth: 3,
            borderColor: COLORS.primary,
          }}
        />
      )}

      {/*Details*/}
      <View
        style={{
          flex: 1,
          marginLeft: SIZES.base,
        }}
      >
        {/*Title*/}
        <Text
          style={{
            ...FONTS.h3,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          {quizTitle}
        </Text>
        {/*Instructor*/}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: SIZES.base,
          }}
        >
          <Text
            style={{
              ...FONTS.body4,
            }}
          >
            By {owner}
          </Text>
        </View>

        {/*Ratings and Duration*/}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: SIZES.base,
          }}
        >
          <IconLabel
            icon={icons.star}
            label="holaaa"
            containerStyle={{
              marginLeft: 0,
            }}
            iconStyle={{
              width: 15,
              height: 15,
              tintColor: COLORS.primary2,
            }}
            labelStyle={{
              marginLeft: 5,
              color: COLORS.black,
              fontWeight: "bold",
            }}
          />

          {/*<IconLabel
            icon={icons.time}
            label="sii"
            containerStyle={{
              marginLeft: SIZES.base,
            }}
            iconStyle={{
              width: 15,
              height: 15,
            }}
            labelStyle={{
              ...FONTS.body4,
              fontWeight: "bold",
            }}
          />*/}
        </View>
        {/*Button*/}
        <TouchableOpacity
          style={{
            paddingVertical: 5,
            paddingHorizontal: 30,
            borderRadius: 50,
            backgroundColor: COLORS.secondary,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            position: "relative",
            marginTop: 7,
          }}
          onPress={() => {
            navigation.navigate("PlayQuiz", {
              quizId: quizId,
              quizImg: quizImage,
              quizOwner: owner,
            });
          }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h3, letterSpacing: 5 }}>
            Play
          </Text>
          <Ionicons
            name="play"
            size={22}
            style={{
              alignSelf: "center",
              color: COLORS.white,
              position: "absolute",
              right: SIZES.padding,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default HorizontalCourseCard;
