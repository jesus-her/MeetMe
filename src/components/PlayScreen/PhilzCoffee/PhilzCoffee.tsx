import React from "react";
import { Dimensions, View, ScrollView, StyleSheet, Text } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolateColor,
} from "react-native-reanimated";

import { products } from "./Model";
import Card, { CARD_HEIGHT } from "./Card";
import Products from "./Products";
import { COLORS, SIZES } from "../../../constants";
import QuestionHeader from "../../QuestionHeader";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  slider: {
    height: SIZES.heightPlayScreen,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: SIZES.padding,
  },
});
const snapToOffsets = [0, CARD_HEIGHT];

const PhilzCoffee = () => {
  const translateX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateX.value = event.contentOffset.x;
    },
  });
  const style = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateX.value,
      products.map((_, i) => width * i),
      products.map((product) => product.color2)
    ) as string;
    return {
      backgroundColor,
      height: SIZES.heightPlayScreen,
      width: SIZES.width,
    };
  });
  return (
    <Animated.View style={style}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        snapToOffsets={snapToOffsets}
        snapToEnd={false}
        decelerationRate="fast"
      >
        <View style={styles.slider}>
          <QuestionHeader
            label="¿Cuál es mi helado favorito?"
            colors={[COLORS.secondary, COLORS.secondary]}
            textColor={COLORS.white}
          />
          <Animated.ScrollView
            onScroll={onScroll}
            scrollEventThrottle={16}
            decelerationRate="fast"
            snapToInterval={width}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {products.map((product, index) => (
              <Card product={product} key={index} />
            ))}
          </Animated.ScrollView>
          <Products x={translateX} />
        </View>
        {/* <Cards />*/}
      </ScrollView>
    </Animated.View>
  );
};

export default PhilzCoffee;
