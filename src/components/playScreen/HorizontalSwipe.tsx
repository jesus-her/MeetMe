import * as React from "react";
import {
  StatusBar,
  Animated,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Button,
  Alert,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import CustomButton from "../CustomButton";
import { COLORS, FONTS, icons, SIZES } from "../../constants";
import { useHeaderHeight } from "@react-navigation/stack";

const { width, height } = Dimensions.get("screen");
/*const headerHeight = useHeaderHeight();*/

// https://www.flaticon.com/packs/retro-wave
// inspiration: https://dribbble.com/shots/11164698-Onboarding-screens-animation
// https://twitter.com/mironcatalin/status/1321180191935373312

const bgs = [COLORS.primary2, "#ff5274", "#FEDB41", "#ff5757", "#70c3e8"];
const DATA = [
  {
    key: 1,
    title: " ¿Cuál es mi estación del año favorita?",
    image: "https://i.imgur.com/lPOv6iG.png",
    buttonIcon: require("../../../assets/seasons/rocket.png"),
  },
  {
    key: 2,
    title: "Primavera",
    image: "https://i.imgur.com/HHLqJlZ.png",
    buttonIcon: require("../../../assets/seasons/flower.png"),
  },
  {
    key: 3,
    title: "Verano",
    image: "https://i.imgur.com/DNvbWYV.png",
    buttonIcon: require("../../../assets/seasons/sun.png"),
  },
  {
    key: 4,
    title: "Otoño",
    image: "https://i.imgur.com/6smIjOA.png",
    buttonIcon: require("../../../assets/seasons/otono.png"),
  },
  {
    key: 5,
    title: "Invierno",
    image: "https://i.imgur.com/6MjHs19.png",
    buttonIcon: require("../../../assets/seasons/snowflake.png"),
  },
];
const question = () => (
  <Text
    style={{
      textAlign: "center",
      marginTop: 20,
      paddingHorizontal: 10,
      ...FONTS.h1,
    }}
  >
    ¿Cuál es mi estación del año favorita?
  </Text>
);
// @ts-ignore
const Indicator = ({ scrollX }) => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 10,
        flexDirection: "row",
      }}
    >
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.7, 0.8],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: "#333",
              margin: 10,
              transform: [
                {
                  scale,
                },
              ],
            }}
          />
        );
      })}
    </View>
  );
};

const Backdrop = ({ scrollX }) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((bg) => bg),
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor,
        },
      ]}
    />
  );
};

const Square = ({ scrollX }) => {
  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1
  );
  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["35deg", "0deg", "35deg"],
  });
  return (
    <Animated.View
      style={{
        width: height,
        height: height,
        borderRadius: 100,
        backgroundColor: COLORS.white,
        position: "absolute",
        top: -height * 0.6,
        left: -height * 0.31,
        transform: [
          {
            rotate,
          },
        ],
      }}
    />
  );
};

export default function HorizontalSwipe() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  /*const headerHeight = useHeaderHeight();
  console.warn(headerHeight);*/

  return (
    <>
      <View style={styles.container}>
        <Backdrop scrollX={scrollX} />
        <Square scrollX={scrollX} />
        <Animated.FlatList
          data={DATA}
          keyExtractor={(item) => item.key}
          horizontal
          pagingEnabled
          scrollEventThrottle={32}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  width,
                  alignItems: "center",
                }}
              >
                {item.key !== 1 && question()}

                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Image
                    style={{
                      width: width / 2,
                      height: height / 2,
                      resizeMode: "contain",
                    }}
                    source={{ uri: item.image }}
                  />
                </View>

                <View
                  style={{
                    height: SIZES.height / 6,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.h1,
                      textAlign: "center",
                      color: COLORS.black,
                    }}
                  >
                    {item.title}
                  </Text>
                  {item.key !== 1 && (
                    <CustomButton
                      colors={["#fff", "#D5DEE7"]}
                      icon={item.buttonIcon}
                      label="Seleccionar"
                      contentContainerStyle={{
                        borderRadius: SIZES.radius,
                        width: SIZES.width / 2,
                        height: 30,
                      }}
                      labelStyle={{
                        color: COLORS.black,
                      }}
                    />
                  )}
                </View>
              </View>
            );
          }}
        />
        <Indicator scrollX={scrollX} />
      </View>
    </>
  );
}
/**/
const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: SIZES.width,
    height: SIZES.height,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
