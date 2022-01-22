import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { COLORS } from "../../constants";
import { AntDesign } from "@expo/vector-icons";

export default NextButton = ({ percentage, scrollTo }) => {
  const size = 128;
  const strokeWidth = 3;
  const center = size / 2;
  const radius = size / 2 - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);
  const animation = (toValue) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener(
      (value) => {
        const strokeDashoffset =
          circumference - (circumference * value.value) / 100;

        if (progressRef?.current) {
          progressRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      [percentage]
    );
    return () => {
      progressAnimation.removeAllListeners();
    };
  });
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Svg width={size} height={size}>
        <G rotation="-90" origin={center}>
          <Circle
            stroke="#A1A1A1"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            ref={progressRef}
            stroke="#F72585"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
          />
        </G>
      </Svg>
      <TouchableOpacity
        onPress={scrollTo}
        style={styles.button}
        activeOpacity={0.6}
      >
        <AntDesign name="arrowright" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    position: "absolute",
    backgroundColor: COLORS.secondary,
    borderRadius: 100,
    padding: 20,
  },
});
