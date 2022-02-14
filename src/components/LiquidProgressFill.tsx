import React, { useState } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import LiquidProgress from "react-native-liquid-progress";
import { COLORS, FONTS, SIZES } from "../constants";

export default function LiquidProgressFill({ correctCount, totalCount }) {
  const [value, setValue] = useState(correctCount / totalCount + 0.005);
  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",
          right: -12,
          bottom: 12,
          width: SIZES.width / 2,
        }}
      >
        <LiquidProgress
          backgroundColor={"black"}
          frontWaveColor={COLORS.secondary}
          backWaveColor={COLORS.primary3}
          fill={value}
          size={SIZES.width / 2}
        >
          <Animated.View style={styles.row}>
            <Text style={styles.textScore}>
              {correctCount} / {totalCount}
            </Text>
          </Animated.View>
        </LiquidProgress>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: SIZES.width / 2,
    width: SIZES.width / 2,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: SIZES.padding,
  },
  row: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textScore: {
    color: "white",
    ...FONTS.h1,
    textAlign: "center",
  },
});
