import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Cross from "./Cross";
import Heart from "./Heart";
import Progress from "./Progress";
import Character from "./Character";
import { COLORS, FONTS, SIZES } from "../../../../constants";
import QuestionHeader from "../../../QuestionHeader";

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
    <View
      style={{
        alignItems: "center",
        height: SIZES.heightPlayScreen / 2.5,
      }}
    >
      {/*<View style={styles.row}>
        <Cross />
        <Progress />
        <Heart />
      </View>*/}
      <QuestionHeader
        label="Translate this sentence"
        colors={[COLORS.white, COLORS.white]}
        textColor={COLORS.secondary}
        containerStyle={{ elevation: 2 }}
      />
      <Character />
    </View>
  );
};

export default Header;
