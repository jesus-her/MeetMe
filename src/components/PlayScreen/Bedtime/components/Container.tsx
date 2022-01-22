import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useDerivedValue } from "react-native-reanimated";
import { ReText } from "react-native-redash";

import {
  PADDING,
  formatDuration2,
  radToMinutes,
  absoluteDuration,
} from "../Constants";

import Label from "./Label";
import { COLORS } from "../../../../constants";

interface ContainerProps {
  start: Animated.SharedValue<number>;
  end: Animated.SharedValue<number>;
  children: ReactNode;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: PADDING,
  },
  values: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  duration: {
    fontSize: 24,
    textAlign: "center",
    marginTop: PADDING,
    color: "black",
  },
});

const Container = ({ start, end, children }: ContainerProps) => {
  const duration = useDerivedValue(() => {
    const d = absoluteDuration(start.value, end.value);
    return formatDuration2(radToMinutes(d));
  });
  return (
    <View style={styles.container}>
      <View style={styles.values}>
        <Label theta={start} label="BEDTIME" icon="bed" />
        <Label theta={end} label="WAKE UP" icon="bell" />
      </View>
      {children}
      <ReText style={styles.duration} text={duration} />
    </View>
  );
};

export default Container;
