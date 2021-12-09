import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { MARGIN } from "./Config";
import Tile from "./Tile";
import SortableList from "./SortableList";
import { COLORS, FONTS, SIZES } from "../constants";
import { StyleSheet, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Footer from "../Duolingo/components/Footer";
import { LinearGradient } from "expo-linear-gradient";

const tiles = [
  {
    id: "1",
    uri: "https://i.imgur.com/wXMTixZl.png",
  },

  {
    id: "2",
    uri: "https://i.imgur.com/0IU8JVql.png",
  },
  {
    id: "3",
    uri: "https://i.imgur.com/AMQjgHYl.png",
  },
];

const Chrome = () => {
  return (
    <LinearGradient
      colors={["#0195E5", "#0276BE", "#04386F"]}
      style={{
        width: SIZES.width,
        height: SIZES.height,
        paddingTop: SIZES.padding,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h1,
          }}
        >
          Resolve it!
        </Text>
      </View>
      <SortableList
        editing={true}
        onDragEnd={(positions) =>
          console.log(JSON.stringify(positions, null, 2))
        }
      >
        {[...tiles, ...tiles].map((tile, index) => (
          <Tile
            onLongPress={() => true}
            key={tile.id + "-" + index}
            id={tile.id + "-" + index}
            uri={tile.uri}
          />
        ))}
      </SortableList>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Footer />
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#59CB01",
    width: "100%",
    height: 45,
    borderRadius: 16,
    justifyContent: "center",
  },
  label: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});
export default Chrome;
