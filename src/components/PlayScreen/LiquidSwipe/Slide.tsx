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
    justifyContent: "center",
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
  allQuestionsLength,
}: SlideProps) => {
  const lighterColor = Color(color).lighten(0.1).toString();

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
            {/* <QuestionHeader
              label={question}
              colors={[COLORS.white, COLORS.white]}
              textColor={COLORS.black}
              containerStyle={{
                elevation: 0,
              }}
            />*/}
            <Text
              style={{
                ...FONTS.largeTitle,
                color: COLORS.white,
                marginVertical: SIZES.base,
              }}
            >
              {question}
            </Text>

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
