import React from "react";
import { Dimensions, View, StyleSheet, Text } from "react-native";

import { Product } from "./Model";
import Button from "./components/Button";
/*import CardHeader from "./components/CardHeader";*/
import { FONTS, SIZES } from "../constants";

const { width } = Dimensions.get("window");
export const CARD_HEIGHT = (width * 1564) / 974;
const styles = StyleSheet.create({
  container: {
    width,
    height: "100%",
  },
  title: {
    ...FONTS.largeTitle,
    textAlign: "center",
    color: "black",
    letterSpacing: 5,
  },
  subtitle: {
    fontSize: SIZES.h2,
    textAlign: "center",
    color: "#432406",
  },
});

interface CardProps {
  product: Product;
}

const Card = ({ product: { color1, title, subtitle } }: CardProps) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          borderRadius: SIZES.radius,
          margin: SIZES.padding,
          flex: 1,
          backgroundColor: color1,
          padding: 16,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.7)",
            borderRadius: SIZES.radius,
            height: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/*<CardHeader />*/}
          <Text numberOfLines={2} style={styles.title}>
            {title}
          </Text>
          {/*<Text style={styles.subtitle}>{subtitle}</Text>*/}
        </View>
        <Button label="Select" />
      </View>
    </View>
  );
};

export default Card;
