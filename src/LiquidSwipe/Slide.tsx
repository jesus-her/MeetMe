import Color from "color";
import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import Svg, { RadialGradient, Defs, Rect, Stop } from "react-native-svg";
import CustomButton from "../components/CustomButton";
import { COLORS, SIZES } from "../constants";

const { width, height } = Dimensions.get("screen");
const SIZE = width - 75;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: 75,
    paddingTop: 150,
    alignItems: "center",
    justifyContent: "flex-end",
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
    fontSize: 48,
    fontWeight: "bold",
    color: "#ffffff",
    textShadowColor: "black",
    textShadowRadius: 1,
    textAlign: "center",
    marginBottom: 16,
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
        <Image source={picture} style={styles.image} />
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <View
            style={{
              zIndex: 1000,
            }}
          >
            {/*<CustomButton
              label="Seleccionar"
              contentContainerStyle={{
                backgroundColor: COLORS.black,
                borderRadius: SIZES.radius,
                width: 150,
                height: 30,
                marginTop: 30,
              }}
              labelStyle={{
                color: COLORS.white,
              }}
            />*/}
          </View>
        </View>
      </View>
    </>
  );
};

export default Slide;
