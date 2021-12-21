import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { WORD_HEIGHT } from "./Layout";
import { COLORS, FONTS } from "../../../constants";

const styles = StyleSheet.create({
  root: {
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 3,
    borderColor: "#E8E6E8",
    backgroundColor: COLORS.primary2,
    height: WORD_HEIGHT - 5,
    width: "100%",
  },
  text: {
    color: COLORS.white,
    ...FONTS.h4,
    textAlign: "center",
  },
  shadow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
    borderBottomWidth: 3,
    borderColor: "#E8E6E8",
    top: 4,
  },
});

interface WordProps {
  id: number;
  word: string;
}

const Word = ({ word }: WordProps) => (
  <View style={styles.root}>
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>{word}</Text>
      </View>
      <View style={styles.shadow} />
    </View>
  </View>
);

export default Word;
