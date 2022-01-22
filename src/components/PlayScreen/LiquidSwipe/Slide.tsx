import Color from "color";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import Svg, { RadialGradient, Defs, Rect, Stop } from "react-native-svg";
import { COLORS, FONTS, SIZES } from "../../../constants";
import CheckButton from "../../CheckButton";
import QuestionHeader from "../../QuestionHeader";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");
const SIZE = width - 75;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: 85,
    paddingTop: 50,
    alignItems: "center",
  },
  image: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -75 }, { translateY: -75 }],
    width: SIZE - 30,
    height: SIZE - 30,
    borderRadius: 170,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.black,
    textAlign: "center",
    letterSpacing: 5,
    backgroundColor: "rgba(255,255,255,0.75)",
    borderRadius: SIZES.radius,
  },
  description: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});

export interface SlideProps {
  slide: {
    id: number;
    color: string;
    title: string;
    description: string;
    picture: ReturnType<typeof require>;
  };
}

const Slide = ({
  slide: { picture, color, title, id },
  question,
  allOptions,
  ListFooterComponent,
  quizImage,
  correctCount,
  incorrectCount,
  quizOwner,
  quizImg,
  quizTitle,
}: SlideProps) => {
  const lighterColor = Color(color).lighten(0.45).toString();

  return (
    <>
      <Svg style={[StyleSheet.absoluteFill, { zIndex: 0 }]}>
        <Defs>
          <RadialGradient id="gradient" cx="50%" cy="50%">
            <Stop offset="0%" stopColor={lighterColor} />
            <Stop offset="100%" stopColor={color} />
          </RadialGradient>
        </Defs>
        <Rect
          x={0}
          y={0}
          width={width}
          height={SIZES.heightPlayScreen}
          fill="url(#gradient)"
        />
      </Svg>

      <View style={styles.container}>
        {id == 1 && (
          <>
            {/* Top Bar Inside */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: "rgba(255,255,255,0.85)",
                elevation: 0,
                height: SIZES.heightNav,
                width: SIZES.width - SIZES.padding,
                borderRadius: SIZES.heightNav,
              }}
            >
              <Image
                source={{ uri: quizImg }}
                style={{
                  width: SIZES.heightNav / 1.3,
                  height: SIZES.heightNav / 1.3,
                  borderRadius: SIZES.heightNav,
                }}
              />
              <View style={{ maxWidth: SIZES.width / 2 }}>
                {/* Title */}
                <Text
                  style={{
                    ...FONTS.h3,
                    marginHorizontal: 10,
                    textAlign: "center",
                  }}
                >
                  {quizTitle} Quiz
                </Text>
                {/* Quiz by: */}
                <Text
                  style={{
                    ...FONTS.h5,
                    marginHorizontal: 10,
                    color: COLORS.primary,
                    textAlign: "center",
                  }}
                >
                  Quiz by: {quizOwner}
                </Text>
              </View>

              {/* Correct and incorrect count */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Correct */}
                <View
                  style={{
                    backgroundColor: COLORS.primary2,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderWidth: 2,
                    borderColor: COLORS.black,
                  }}
                >
                  <Ionicons
                    name="checkmark"
                    size={14}
                    style={{ color: COLORS.white }}
                  />
                  <Text
                    style={{ color: COLORS.white, marginLeft: 6, ...FONTS.h4 }}
                  >
                    {correctCount}
                  </Text>
                </View>

                {/* Incorrect */}
                <View
                  style={{
                    backgroundColor: COLORS.secondary,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                    borderWidth: 2,
                    borderColor: COLORS.black,
                  }}
                >
                  <Ionicons
                    name="close"
                    size={14}
                    style={{ color: COLORS.white }}
                  />
                  <Text
                    style={{ color: COLORS.white, marginLeft: 6, ...FONTS.h4 }}
                  >
                    {incorrectCount}
                  </Text>
                </View>
              </View>
            </View>
            <QuestionHeader
              label={question}
              colors={[COLORS.primary, COLORS.primary2]}
              textColor={COLORS.white}
              containerStyle={{
                elevation: 0,
              }}
            />
            {/*<Image style={styles.image} source={{ uri: quizImage }} />*/}
          </>
        )}

        {/*<Image source={pictureBack} style={styles.backUp} />*/}
        {/*<Image source={picture} style={styles.image} />*/}
        {/*<Image source={pictureBack} style={styles.backDown} />*/}

        {id !== 1 && (
          <>
            <View
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "space-around",
                zIndex: 100,
              }}
            >
              {allOptions}
            </View>
            {/*<View
              style={{
                position: "absolute",
                bottom: 0,
                zIndex: 1,
              }}
            >
              {ListFooterComponent}
            </View>*/}
          </>
        )}
      </View>
    </>
  );
};

export default Slide;
