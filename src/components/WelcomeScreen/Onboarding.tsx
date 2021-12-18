import React, { useState, useRef } from "react";
import { View, Text, Image, FlatList, Animated } from "react-native";
import slides from "./slides";
import { useNavigation } from "@react-navigation/native";
import OnboardingItem from "./OnboardingItem";
import { SIZES } from "../../constants";
import Paginator from "./Paginator";
import NextButton from "./NextButton";

export default Onboarding = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      // console.log("last page");
      navigation.navigate("Home");
    }
  };
  return (
    <View
      style={{
        width: SIZES.width,
        height: SIZES.height,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          horizontal
          pagingEnabled={true}
          bounces={false}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={32}
          ref={slidesRef}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          renderItem={({ item }) => <OnboardingItem item={item} />}
        />
      </View>
      <View
        style={{
          height: SIZES.height / 3,
          width: SIZES.width,
          justifyContent: "space-between",
          padding: SIZES.padding,
          alignItems: "center",
        }}
      >
        <Paginator data={slides} scrollX={scrollX} />
        <NextButton
          scrollTo={scrollTo}
          percentage={(currentIndex + 1) * (100 / slides.length)}
        />
      </View>
    </View>
  );
};
