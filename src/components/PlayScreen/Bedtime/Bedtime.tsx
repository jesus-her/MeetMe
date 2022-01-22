import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import CircularSlider from "./CircularSlider";
import { PADDING } from "./Constants";
import Container from "./components/Container";
import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    height: SIZES.heightPlayScreen,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: PADDING,
  },
  title: {
    fontSize: 36,
    color: COLORS.black,
    marginBottom: 32,
  },
});

const Bedtime = () => {
  const start = useSharedValue(0);
  const end = useSharedValue(1.5 * Math.PI);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Next Wake Up Only</Text>
      <Container start={start} end={end}>
        <CircularSlider start={start} end={end} />
      </Container>
    </View>
  );
};

export default Bedtime;
