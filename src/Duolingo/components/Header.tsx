import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Cross from "./Cross";
import Heart from "./Heart";
import Progress from "./Progress";
import Character from "./Character";
import { COLORS, FONTS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: {
    ...FONTS.h1,
    textAlign: "center",
    color: COLORS.secondary,
    padding: SIZES.padding,
  },
});

const Header = () => {
  return (
    <View style={{ alignItems: "center" }}>
      {/*<View style={styles.row}>
        <Cross />
        <Progress />
        <Heart />
      </View>*/}
      <Text style={styles.title}>Translate this sentence</Text>
      <Character />
    </View>
  );
};

export default Header;
