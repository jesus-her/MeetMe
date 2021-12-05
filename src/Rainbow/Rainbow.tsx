import React from "react";
import { StyleSheet, View } from "react-native";

import Graph from "./Graph";
import Footer from "./components/Footer";
import { SIZES } from "../constants";

const styles = StyleSheet.create({
  container: {
    height: SIZES.height,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
});

const Rainbow = () => {
  return (
    <View style={styles.container}>
      <Graph />
      <Footer />
    </View>
  );
};

export default Rainbow;
