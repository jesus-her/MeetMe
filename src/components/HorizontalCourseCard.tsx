import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  ImageBackground,
  View,
  Image,
  ToastAndroid,
} from "react-native";
import { COLORS, FONTS, SIZES, icons } from "../constants";
import IconLabel from "./IconLabel";
import CustomButton2 from "./CustomButton2";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { firestore } from "../../firebase";

const HorizontalCourseCard = ({
  course,
  containerStyle,
  quizImage,
  quizTitle,
  owner,
  quizId,
  quizAttempts,
  favorite,
}) => {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(true);

  const updateFavorite = () => {
    setIsFavorite(!isFavorite);
    firestore
      .collection("Quizzes")
      .doc(quizId)
      .update({ isFavorite: isFavorite })
      .then(() => {
        console.log("added to favorites");
      })
      .catch((e) => console.log("error", e));
  };

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: SIZES.radius,
        elevation: 3,
        marginHorizontal: SIZES.padding,
        ...containerStyle,
      }}
    >
      {/*Favourite button*/}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={updateFavorite}
        style={{
          position: "absolute",
          top: 7,
          left: 7,
          width: 35,
          height: 35,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 5,
          backgroundColor: COLORS.white,
          elevation: 3,
          zIndex: 10,
        }}
      >
        <Image
          source={icons.favourite}
          resizeMode="contain"
          style={{
            width: 20,
            height: 20,
            borderRadius: 60,
            tintColor: favorite ? COLORS.secondary : COLORS.additionalColor4,
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
            borderRadius: SIZES.radius,
            borderWidth: 1,
            borderColor: COLORS.gray20,
          }}
        />
      ) : (
        <View
          style={{
            height: 120,
            width: 120,
            borderRadius: SIZES.radius,
            borderWidth: 1,
            borderColor: COLORS.gray20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../assets/icons/laughing.png")}
            resizeMode="contain"
            style={{
              height: "95%",
              width: "95%",
              borderRadius: 60,
            }}
          />
        </View>
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

        {/*Attempts*/}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: SIZES.base,
          }}
        >
          <IconLabel
            icon={icons.solve}
            label={"Attempted times: " + quizAttempts}
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
              color: COLORS.primary2,
              ...FONTS.h4,
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
          activeOpacity={0.8}
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
