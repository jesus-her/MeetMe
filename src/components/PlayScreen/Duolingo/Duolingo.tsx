import React from "react";
import { View, StyleSheet } from "react-native";

import WordList from "./WordList";
import Word from "./Word";
import Header from "./components/Header";
import CheckButton from "../../CheckButton";
import { SIZES } from "../../../constants";

const words = [
  { id: 1, word: "Los" },
  { id: 5, word: "uy" },
  { id: 2, word: "miro" },
  { id: 7, word: "HolaMeLlamo" },
  { id: 4, word: "Jump" },
  { id: 6, word: "meetme" },
  { id: 3, word: "Helix" },
];

const Duolingo = () => {
  return (
    <>
      <View style={styles.container}>
        <Header />
        <WordList>
          {words.map((word) => (
            <Word key={word.id} {...word} />
          ))}
        </WordList>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <CheckButton />
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    height: SIZES.heightPlayScreen,
    backgroundColor: "white",
  },
});

export default Duolingo;
