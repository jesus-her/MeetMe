import React from "react";
import { View, StyleSheet } from "react-native";
import { SIZES } from "../constants";
import DrawerIcon from "./DrawerIcon";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "../utils/auth";

const DrawerFooter = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.footer}>
        <DrawerIcon
          icon="information-circle-outline"
          label="About"
          onPress={() => {
            navigation.navigate("Welcome");
          }}
        />
        {/*<DrawerIcon
          icon="share-social-outline"
          label="Social"
          onPress={() => {
            navigation.navigate("Picker");
          }}
        />*/}
        <DrawerIcon icon="exit-outline" label="Exit" onPress={signOut} />
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
