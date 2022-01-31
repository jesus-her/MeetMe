import React from "react";
import { Image, Text, View } from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../../constants";
import { IconButton } from "../ProfileScreen";
import firebase from "firebase";
import { auth } from "../../../firebase";
import images from "../../constants/images";
import { LinearGradient } from "expo-linear-gradient";

const HeaderSection = ({ title, onPress, icon, source, style }) => {
  const user = auth.currentUser;
  return (
    <>
      {/*<View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: COLORS.white,
          elevation: 4,
          padding: SIZES.padding / 2,
        }}
      >
        <Text style={{ ...FONTS.h1, color: COLORS.black }}>{title}</Text>
      </View>*/}
      <LinearGradient
        colors={[COLORS.primary, COLORS.primary2]}
        start={{ x: 1, y: 0.1 }}
        end={{ x: 1, y: 1 }}
        style={{
          flexDirection: "row",
          paddingHorizontal: SIZES.padding,
          justifyContent: "flex-start",
          alignItems: "center",
          height: SIZES.heightNav,
          position: "relative",
          backgroundColor: COLORS.white,
          elevation: 7,
          width: "100%",
          ...style,
        }}
      >
        <IconButton
          icon={icon}
          iconStyle={{
            tintColor: COLORS.white,
          }}
          containerStyle={{ marginRight: SIZES.radius }}
          onPress={onPress}
        />

        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.white,
          }}
        >
          {title}
        </Text>
        <Image
          resizeMode="contain"
          source={source}
          style={{
            width: SIZES.width / 3,
            height: SIZES.heightNav / 2.5,
            tintColor: COLORS.white,
            alignSelf: "center",
          }}
        />
      </LinearGradient>
    </>
  );
};

export default HeaderSection;
