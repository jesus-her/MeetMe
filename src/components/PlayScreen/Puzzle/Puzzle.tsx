import React from "react";
import Tile from "./Tile";
import SortableList from "./SortableList";
import { COLORS, FONTS, SIZES } from "../../../constants";
import { StyleSheet, Text, View } from "react-native";
import CheckButton from "../../CheckButton";
import { LinearGradient } from "expo-linear-gradient";
import QuestionHeader from "../../QuestionHeader";

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

const Puzzle = () => {
  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.primary3]}
      style={{
        width: SIZES.width,
        height: SIZES.heightPlayScreen,
        paddingTop: SIZES.padding,
      }}
    >
      <QuestionHeader
        colors={[COLORS.primary2, COLORS.primary3]}
        textColor={COLORS.black}
        label="¡Resuélvelo!"
      />
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
        <CheckButton />
      </View>
    </LinearGradient>
  );
};
export default Puzzle;
