import * as React from "react";
import {
  Animated,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../../../constants";
import CheckButton from "../../CheckButton";
import QuestionHeader from "../../QuestionHeader";
const { width, height } = Dimensions.get("screen");

// https://www.flaticon.com/packs/retro-wave
// inspiration: https://dribbble.com/shots/11164698-Onboarding-screens-animation
// https://twitter.com/mironcatalin/status/1321180191935373312

const bgs = [COLORS.primary2, "#ff5274", "#FEDB41", "#ff5757", "#70c3e8"];
const DATA = [
  {
    key: 1,
    title: " ¿Cuál es mi estación del año favorita?",
    image: "https://i.imgur.com/lPOv6iG.png",
  },
  {
    key: 2,
    title: "Primavera",
    image: "https://i.imgur.com/HHLqJlZ.png",
  },
  {
    key: 3,
    title: "Verano",
    image: "https://i.imgur.com/DNvbWYV.png",
  },
  {
    key: 4,
    title: "Otoño",
    image: "https://i.imgur.com/6smIjOA.png",
  },
  {
    key: 5,
    title: "Invierno",
    image: "https://i.imgur.com/6MjHs19.png",
  },
];
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
        width: SIZES.heightPlayScreen,
        height: SIZES.heightPlayScreen,
        borderRadius: 100,
        backgroundColor: COLORS.white,
        position: "absolute",
        top: -height * 0.5,
        left: -height * 0.25,
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
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  width,
                  height: SIZES.heightPlayScreen,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    height: SIZES.heightPlayScreen / 2,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.key !== 1 && (
                    <QuestionHeader
                      colors={[COLORS.secondary2, COLORS.primary]}
                      textColor={COLORS.white}
                      label="¿Cuál es mi estación del año favorita?"
                    />
                  )}
                  <Image
                    style={{
                      width: SIZES.heightPlayScreen / 4,
                      height: SIZES.heightPlayScreen / 4,
                      resizeMode: "contain",
                    }}
                    source={{ uri: item.image }}
                  />
                </View>

                <View
                  style={{
                    height: SIZES.heightPlayScreen / 3.3,
                    marginTop: 70,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      elevation: 2,
                      borderRadius: SIZES.radius,
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                      marginBottom: SIZES.base,
                      backgroundColor: "#FFFFFF",
                      width: SIZES.width * 0.75,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        ...FONTS.h2,
                        letterSpacing: 1,
                        padding: 7,
                        color: COLORS.black,
                      }}
                    >
                      {item.title}
                    </Text>
                  </View>
                  {item.key !== 1 && <CheckButton />}
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
    height: SIZES.heightPlayScreen,
    alignItems: "center",
    justifyContent: "center",
  },
});
