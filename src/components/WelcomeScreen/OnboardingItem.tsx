import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";

export default OnboardingItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SIZES.padding,
    width: SIZES.width,
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    flex: 0.6,
    resizeMode: "contain",
    justifyContent: "center",
  },
  title: {
    ...FONTS.largeTitle,
    textAlign: "center",
    color: COLORS.secondary,
  },
  description: {
    ...FONTS.h3,
    textAlign: "center",
    margin: 10,
    color: COLORS.gray30,
  },
});
