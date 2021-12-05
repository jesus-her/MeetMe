import React from "react";
import { View, StyleSheet } from "react-native";

import WordList from "./WordList";
import Word from "./Word";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { SIZES } from "../constants";

const words = [
  { id: 1, word: "Los" },
  { id: 8, word: "uy" },
  { id: 2, word: "miro" },
  { id: 7, word: "(" },
  { id: 6, word: "Jump" },
  { id: 9, word: ")" },
  { id: 5, word: "Helix" },
  { id: 3, word: "mientras" },
  { id: 4, word: "juego" },
];

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    height: SIZES.height,
    backgroundColor: "white",
  },
});

const Duolingo = () => {
  return (
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
        <Footer />
      </View>
    </View>
  );
};

export default Duolingo;
