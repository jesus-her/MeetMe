import React from "react";
import { View, StyleSheet } from "react-native";
import { SIZES } from "../constants";
import DrawerIcon from "./DrawerIcon";
import { useNavigation } from "@react-navigation/native";

const DrawerFooter = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.footer}>
        <DrawerIcon
          icon="share-social-outline"
          label="Social"
          onPress={() => {
            navigation.navigate("Picker");
          }}
        />
        <DrawerIcon
          icon="exit-outline"
          label="Exit"
          onPress={() => {
            console.log("Exit");
          }}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  footer: {
    padding: SIZES.padding,
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    marginHorizontal: 10,
  },
});
export default DrawerFooter;
