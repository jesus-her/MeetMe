import Color from "color";
import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import Svg, { RadialGradient, Defs, Rect, Stop } from "react-native-svg";
import { COLORS, FONTS, SIZES } from "../../../constants";
import CheckButton from "../../CheckButton";

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
    transform: [{ translateX: -50 }, { translateY: -50 }],
    width: SIZE - 30,
    height: SIZE - 30,
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

const Slide = ({ slide: { picture, color, title, id } }: SlideProps) => {
  const lighterColor = Color(color).lighten(0.45).toString();

  return (
    <>
      <Svg style={StyleSheet.absoluteFill}>
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
        <Text style={styles.title}>{title}</Text>
        {/*<Image source={pictureBack} style={styles.backUp} />*/}
        <Image source={picture} style={styles.image} />
        {/*<Image source={pictureBack} style={styles.backDown} />*/}

        {id !== 2 && (
          <View
            style={{
              position: "absolute",
              bottom: 0,
            }}
          >
            <CheckButton />
          </View>
        )}
      </View>
    </>
  );
};

export default Slide;
