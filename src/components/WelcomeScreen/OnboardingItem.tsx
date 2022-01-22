import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";

export default OnboardingItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />

      <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.emoji} style={styles.emoji} />
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
    flex: 0.45,
    resizeMode: "contain",
    justifyContent: "center",
  },
  emoji: {
    width: 50,
    height: 50,
    alignSelf: "center",
    borderColor: "red",
    borderWidth: 1,
  },
  title: {
    ...FONTS.largeTitle,
    textAlign: "center",
    color: COLORS.primary,
  },
  description: {
    ...FONTS.h3,
    textAlign: "center",
    margin: 10,
    color: COLORS.gray30,
  },
});
