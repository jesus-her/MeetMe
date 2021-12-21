import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { WebView } from "react-native-webview";

import { MARGIN, SIZE } from "./Config";
import { SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    width: SIZE - 30,
    height: SIZE - 30,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
interface TileProps {
  id: string;
  uri: string;
  onLongPress: () => void;
}

const Tile = ({ uri }: TileProps) => {
  return (
    <View style={styles.container} pointerEvents="none">
      <Image
        source={{ uri }}
        resizeMode="cover"
        style={{
          borderRadius: SIZES.radius,
          width: SIZE - 30,
          height: SIZE - 30,
        }}
      />
    </View>
  );
};

export default Tile;
