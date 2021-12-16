import Color from "color";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";
import Svg, { RadialGradient, Defs, Rect, Stop } from "react-native-svg";
import { COLORS, FONTS, SIZES } from "../constants";
import Footer from "../Duolingo/components/Footer";
import CustomButton from "../components/CustomButton";

const { width, height } = Dimensions.get("screen");
const SIZE = width - 75;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: 75,
    paddingTop: 50,
    alignItems: "center",
  },
  image: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -70 }, { translateY: -50 }],
    width: SIZE - 30,
    height: SIZE - 30,
  },
  backUp: {
    position: "absolute",
    top: 50,
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },
  backDown: {
    position: "absolute",
    bottom: 70,
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },
  title: {
    ...FONTS.largeTitle,
    color: COLORS.white,
    textAlign: "center",
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
  slide: { picture, color, title, id, pictureBack },
}: SlideProps) => {
  const lighterColor = Color(color).lighten(0.8).toString();

  return (
    <>
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="gradient" cx="50%" cy="35%">
            <Stop offset="0%" stopColor={lighterColor} />
            <Stop offset="100%" stopColor={color} />
          </RadialGradient>
        </Defs>
        <Rect x={0} y={0} width={width} height={height} fill="url(#gradient)" />
      </Svg>

      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Image source={pictureBack} style={styles.backUp} />
        <Image source={picture} style={styles.image} />
        <Image source={pictureBack} style={styles.backDown} />

        {id !== 2 && (
          <View
            style={{
              position: "absolute",
              bottom: 0,
            }}
          >
            <Footer />
          </View>
        )}
      </View>
    </>
  );
};

export default Slide;
