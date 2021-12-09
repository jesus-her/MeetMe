import Color from "color";
import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import Svg, { RadialGradient, Defs, Rect, Stop } from "react-native-svg";
import CustomButton from "../components/CustomButton";
import { COLORS, FONTS, SIZES } from "../constants";
import { COL } from "../Chrome/Config";

const { width, height } = Dimensions.get("screen");
const SIZE = width - 75;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: 75,
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    width: SIZE - 30,
    height: SIZE - 30,
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
    color: string;
    title: string;
    description: string;
    picture: ReturnType<typeof require>;
  };
}

const Slide = ({
  slide: { picture, color, title, description },
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
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.3)",
            width: SIZES.width / 2,
            height: 100,
            borderRadius: SIZES.radius,
          }}
        >
          <Text style={styles.title}>{title}</Text>
        </View>
        <Image source={picture} style={styles.image} />
      </View>
    </>
  );
};

export default Slide;
